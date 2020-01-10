class KatagamisController < ApplicationController
  def index
    # ユーザーページ内の一覧 (アノテーション済みの型紙のみ)
    if params[:owned_user] != '0'
      user = User.includes(annotations: [{katagami: :annotations}]).find(params[:owned_user])
      annotations = user.annotations.page(params[:page]).per(params[:per])

      render json: {
        owned_user_email: user.email,
        count: user.annotations.size,
        katagamis: annotations.map {|annotation| 
          katagami = annotation.katagami
          {
            id: katagami.id,
            name: katagami.name,
            annotation_num: katagami.annotations.size,
            status: annotation.status
          }
        }
      }
    else  
      # 全型紙のidと合わせて, ログインユーザのアノテーション状況を取得
      katagami_ant_statuses = Katagami
                        .includes(annotations: [:user])
                        .where(annotations: {user_id: params[:user]})
                        .pluck(:id, :'annotations.status')
                        .to_h

      # 指定されたページ内の型紙一覧
      katagamis = Katagami.includes(:annotations).page(params[:page]).per(params[:per])

      render json: {
        count: Katagami._count,
        katagamis: katagamis.map {|katagami|
          status = katagami_ant_statuses.find {|k, v| k == katagami.id}
          {
            id: katagami.id,
            name: katagami.name,
            annotation_num: katagami.annotations.size,
            status: status ? status[1] : 0
          }
        }
      }
    end
  end

  def show
    katagami = Katagami.includes(annotations: [:user, {has_labels: :label}]).find(params[:id])

    has_labels_by_position = katagami.annotations.map {|ant| 
      ant.has_labels.map {|has_label| 
        {
          user: ant.user.id.to_s + ' ' + ant.user.email,
          position: has_label.position, 
          label: has_label.label.name
        }
      }
    }.flatten.group_by {|label| label[:position]}
        
    render json: {
      katagami_url: katagami.presigned_url,
      katagami_width: katagami.width,
      katagami_height: katagami.height,
      annotation_num: katagami.annotations.size,
      whole_labels: Label.all.pluck(:name),
      has_labels: has_labels_by_position.map {|k, v| 
        {
          position: k,
          score: v.group_by {|v| v[:label]}.each{|_, v| v.map!{|h| h[:user]}}
        }
      }
    }
  end

  private

    def cache_image(katagami)
      Rails.cache.fetch('katagami_image-' + katagami.id) do
        katagami.presigned_url
      end
    end
end