class KatagamisController < ApplicationController
  def index
    render json: params[:owned_user] != '0' ? 
      Katagami.listing_for_user(params, current_user.id) : Katagami.listing_for_top(params, current_user.id)
  end

  def show
    render json: Katagami.ant_result(params)
  end
end