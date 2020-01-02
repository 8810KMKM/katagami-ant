class KatagamisController < ApplicationController
  def hoge
    # Rails.cache.write('age', 10)
    render json: cache_age
  end

  def index
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
    render json: {
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

  private
    def cache_age
      Rails.cache.fetch('age') do
        10
      end
    end
end