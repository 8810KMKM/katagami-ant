class LabelsController < ApplicationController
  before_action :authenticate_user!

  def target
    render json: Label.listing_for_ant(params)
  end
end
