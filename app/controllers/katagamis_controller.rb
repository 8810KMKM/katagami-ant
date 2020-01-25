class KatagamisController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: params[:owned_user] != '0' ? 
      Katagami.listing_for_user(params) : Katagami.listing_for_top(params)
  end

  def show
    render json: Katagami.ant_result(params)
  end
end