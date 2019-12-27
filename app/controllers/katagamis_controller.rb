class KatagamisController < ApplicationController
  def index
    # A.ログイン中のユーザがアノテーション済みの型紙のidsを取得
    katagami_ids_current_user_done_annotation = 
      Katagami.includes(annotations: [:user])
              .where(annotations: {status: 2, user_id: params[:user_id]})
              .pluck(:id)

    # 型紙一覧の情報 アノテーション件数を表示するためinclude
    katagamis = Katagami.includes(:annotations)
                        .order(created_at: 'DESC')
                        .page(params[:page]).per(5)

    # ある型紙 x をログイン中のユーザはアノテーション済みか ?
    # => A のなかに x が入っているか ?
    render json: katagamis.map {|katagami|
      {
        id: katagami.id,
        name: katagami.name,
        annotation_num: katagami.annotations.size,
        done_by_current_user: 
          !!katagami_ids_current_user_done_annotation.index(katagami.id)
      }
    }
  end
end