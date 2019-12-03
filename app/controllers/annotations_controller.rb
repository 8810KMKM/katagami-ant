class AnnotationsController < ApplicationController
  def create
    ant_params = {
      katagami: Katagami.find(params[:katagami_id]),
      user: User.find(params[:user_id])
    }
    annotation = Annotation.find_by(ant_params) || Annotation.create(ant_params)

    render json: {
      id: annotation.id,
      katagami_url: ant_params[:katagami].presigned_url
    }
  end
end