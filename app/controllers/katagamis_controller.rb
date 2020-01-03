class KatagamisController < ApplicationController
  def index
    render json: cache_katagamis(params)
  end

  private
    def cache_katagamis(params)
      Rails.cache.fetch('katagamis-' + params[:page] + '-' + params[:per]) do
        # A.ログイン中のユーザがアノテーション済みの型紙のidsを取得
        katagami_ids_current_user_done_annotation = 
          Katagami.includes(annotations: [:user])
                  .where(annotations: {status: 2, user_id: params[:user_id]})
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
                !!katagami_ids_current_user_done_annotation.index(katagami.id)
            }
          }
        }
      end
    end
end