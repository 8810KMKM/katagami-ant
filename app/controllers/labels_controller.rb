class LabelsController < ApplicationController
  def index
    render json: Label.all
  end
end