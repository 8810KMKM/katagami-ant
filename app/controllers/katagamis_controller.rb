class KatagamisController < ApplicationController
  def index
    case params[:owned_user]
    when '0'
      katagamis = Katagami.listing_for_top(params, current_user.id)
    when 'my_page'
      params[:owned_user] = current_user.id.to_s
    else
    end
    
    render json: katagamis || Katagami.listing_for_user(params)
  end

  def show
    render json: Katagami.ant_result(params)
  end
end