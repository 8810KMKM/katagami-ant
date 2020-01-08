class KatagamisController < ApplicationController
  def index
    if params[:owned_user]
      render json: cache_owned_katagamis(params)
    else
      render json: cache_katagamis(params)
    end
  end

  def show
    render json: cache_katagami(params)
  end

  private
    def cache_katagami(params)
      Rails.cache.fetch('katagami-' + params[:id]) do
        katagami = Katagami.includes(annotations: [:user, {has_labels: :label}]).find(params[:id])
        # 全アノテーションでラベル付けされているラベル一覧
        whole_labels = katagami.annotations.map {|ant| 
          ant.has_labels.map {|has_label| has_label.label.name}
        }.join(' ')
        .split(' ')
        .to_set
        .reject {|name| name == ''}

        # A. ポジション毎のラベル付け状況
        has_labels_by_position = katagami.annotations.map {|ant| 
          ant.has_labels.map {|has_label| 
            {
              user: ant.user.email,
              position: has_label.position, 
              label: has_label.label.name
            }
          }
        }.flatten.group_by {|label| label[:position]}

        # Aのラベル付けを更にラベル名毎にグループ化
        has_labels_by_position_by_label = has_labels_by_position.map {|k, v| 
          {
            position: k,
            score: v.group_by {|v| v[:label]}.each{|_, v| v.map!{|h| h[:user]}}
          }
        }
            
        {
          katagami_url: katagami.presigned_url,
          katagami_width: katagami.width,
          katagami_height: katagami.height,
          annotation_num: katagami.annotations.size,
          whole_labels: Label.all.pluck(:name),
          has_labels: has_labels_by_position_by_label,
        }
      end
    end

    def cache_image(katagami)
      Rails.cache.fetch('katagami_image-' + katagami.id) do
        katagami.presigned_url
      end
    end

    def cache_katagamis(params)
      Rails.cache.fetch('katagamis-' + params[:page] + '-' + params[:per]) do
        # A.ログイン中のユーザがアノテーション済みの型紙のidsを取得
        user_done_ids = Katagami.includes(annotations: [:user])
                                .where(annotations: {status: 2, user_id: params[:user]})
                                .pluck(:id)

        # 型紙一覧の情報 アノテーション件数を表示するためinclude
        katagamis = Katagami.includes(:annotations)
                            .page(params[:page]).per(params[:per])

        # ある型紙 x をログイン中のユーザはアノテーション済みか ?
        # => A のなかに x が入っているか ?
        {
          count: Katagami._count,
          katagamis: katagamis.map {|katagami|
            {
              id: katagami.id,
              name: katagami.name,
              annotation_num: katagami.annotations.size,
              done_by_current_user: 
                !!user_done_ids.index(katagami.id)
            }
          }
        }
      end
    end

    def cache_owned_katagamis(params)
      Rails.cache.fetch('owned_katagamis-' + params[:page] + '-' + params[:per] + '-' + params[:owned_user]) do
        user = User.includes(annotations: [{katagami: :annotations}]).find(params[:owned_user])
        {
          count: user.annotations.size,
          katagamis: user.annotations.map {|annotation| 
            katagami = annotation.katagami
            {
              id: katagami.id,
              name: katagami.name,
              annotation_num: katagami.annotations.size,
            }
          }
        }
      end
    end
end