class KatagamisController < ApplicationController
  def index
    render json: Katagami.all.select(:id, :name)
  end
end