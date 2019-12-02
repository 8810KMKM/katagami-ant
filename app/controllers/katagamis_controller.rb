class KatagamisController < ApplicationController
  def index
    render json: Katagami.all.select(:id, :src)
  end

  def aws
    katagami = Katagami.find(params[:id])
    
    render json: { image: katagami.presigned_url }
  end
end