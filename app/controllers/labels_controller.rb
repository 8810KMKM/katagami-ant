class LabelsController < ApplicationController
  def target
    render json: Label.listing_for_ant(params)
  end

  def all
    redirect_to user_google_omniauth_authorize_path
  end
end
