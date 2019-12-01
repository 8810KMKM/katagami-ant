class KatagamisController < ApplicationController
  def index
    katagamis = Katagami.order(created_at: 'DESC')
                .select(:id, :src, :width, :height)
    render json: katagamis
  end
end