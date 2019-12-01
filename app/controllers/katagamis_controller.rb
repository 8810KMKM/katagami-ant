class KatagamisController < ApplicationController
  def show
    katagamis = Katagami.order(created_at: 'DESC')
                .select(:id, :src, :width, :height)
    render json: katagamis
  end
end