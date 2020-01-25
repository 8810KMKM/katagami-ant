class AnnotationsController < ApplicationController
  before_action :authenticate_user!

  def create
    render json: Annotation.stand_by(params)
  end

  def add_has_labels
    render json: 
      Annotation.find(params[:annotation_id]).save_result(params)
  end
end