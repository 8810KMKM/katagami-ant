class KatagamisController < ApplicationController
  def index
    render json: cache_katagamis(params)
  end

  def show
    katagami = cache_katagami(params)
    whole_labels = katagami.annotations.map {|ant| 
      ant.has_labels.map {|has_label| has_label.label.name}
    }.join(',')
     .split(',')
     .to_set.reject {|name| name == ''}
    
    render json: {
      whole_labels: whole_labels
    }
  end

  private
    def cache_katagami(params)
      Rails.cache.fetch('katagami-' + params[:id]) do
        katagami = Katagami.includes(annotations: [:user, {has_labels: :label}]).find(params[:id])
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
end