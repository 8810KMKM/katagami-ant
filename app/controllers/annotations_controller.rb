class AnnotationsController < ApplicationController
  def create
    render json: Annotation.stand_by(
      params[:katagami] == 'recommend' ? 
        current_user.recommended_katagami_id : params[:katagami], 
      current_user.id
    )
  end

  def add_has_labels
    render json: 
      Annotation.find(params[:annotation_id]).save_result(params)
  end
end