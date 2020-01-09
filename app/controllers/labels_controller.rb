class LabelsController < ApplicationController
  def get_random
<<<<<<< Updated upstream
    rand_id = Label.pluck(:id).shuffle[0..2]
    render json: Label.where(id: rand_id)
  end

  def target
    annotation = Annotation.find_by(
      katagami_id: params[:katagami],
      user_id: params[:user]
    )
    rest_num = 10 - annotation.status
    target_num = params[:num].to_i

    if rest_num - target_num < 0
      render json: []
    else
      render json: 
        Label.where(id: [1..rest_num]).order(id: 'DESC').limit(target_num)
    end
  end
=======
    rand_id = Label.pluck(:id).shuffle[0]
    render json: [Label.where(id: rand_id)]
  end
>>>>>>> Stashed changes
end
