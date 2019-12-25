class AnnotationsController < ApplicationController
  def create
    ant_params = {
      katagami: Katagami.find(params[:katagami_id]),
      user: User.find(params[:user_id])
    }
    annotation = Annotation.find_by(ant_params) || Annotation.create(ant_params)

    render json: {
      id: annotation.id,
      katagami_url: ant_params[:katagami].presigned_url,
      katagami_width: ant_params[:katagami].width,
      katagami_height: ant_params[:katagami].height
    }
  end

  def add_has_labels
    annotation = Annotation.find(params[:annotation_id])
    # {has_labels: '1 2 3,3 4,0,...'}
    params[:has_labels].split(',').each_with_index do |has_label, i|
      # {has_label: '1 2 3'}
      next if (has_label[0] == '0')
      has_label.split(' ').each do |position|
        HasLabel.create(
          annotation: annotation,
          katagami: annotation.katagami,
          label: Label.find(i + 1),
          position: position.to_i
        )
      end
    end
    render json: annotation.has_labels
  end
end