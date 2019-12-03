class AnnotationsController < ApplicationController
  def create
    katagami = Katagami.find(params[:katagami_id])
    user = User.find(params[:user_id])
    annotation = Annotation.create(
      katagami: katagami,
      user: user
    )
    render json: {
      id: annotation.id,
      katagami_url: katagami.presigned_url
    }
  end
end