class LabelsController < ApplicationController
  def get_random
    rand_id = Label.pluck(:id).shuffle[0..2]
    render json: Label.where(id: rand_id)
  end
end
