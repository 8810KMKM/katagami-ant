class KatagamisController < ApplicationController
  def index
    render json: params[:owned_user] != '0' ? 
      Katagami.listing_for_user(params) : Katagami.listing_for_top(params)
  end

  def show
    binding.pry
    render json: Katagami.ant_result(params)
  end
end