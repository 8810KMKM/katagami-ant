class KatagamisController < ApplicationController
  def index
    katagamis = Katagami.all.select(:id, :src, :width, :height)
    render json: katagamis.each_slice(2).to_a
  end
end