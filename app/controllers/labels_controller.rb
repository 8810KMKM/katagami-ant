class LabelsController < ApplicationController
  def target
    render json: Label.listing_for_ant(params)
  end
end
