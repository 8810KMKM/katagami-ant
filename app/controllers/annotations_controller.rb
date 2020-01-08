class AnnotationsController < ApplicationController
  def create
    render json: cache_annotation(params)
  end

  def add_has_labels
    annotation = Annotation.find(params[:annotation_id])
    # {has_labels: '4 1 2 3,2 3 4,1 0'}
    # {has_labels: 'label.id [positions],label.id [position]'}
    new_status = annotation.status

    HasLabel.transaction do
      params[:has_labels].split(',').each do |has_label|
        _has_label = has_label.split(' ').map { |n| n.to_i }
        label = Label.find(_has_label.shift)

        _has_label.each do |position|
          HasLabel.create(
            annotation: annotation,
            katagami: annotation.katagami,
            label: label,
            position: position
          )
        end
      end
      new_status += 1
    end
      annotation.update(status: new_status)
      p annotation
      render json: annotation.has_labels

    rescue => e
      p e.message
      render json: []
  end

  private
    def cache_annotation(params)
      Rails.cache.fetch('annotation-' + params[:katagami] + '-' + params[:user]) do
        ant_params = {
          katagami: Katagami.find(params[:katagami]),
          user: User.find(params[:user])
        }
        annotation = Annotation.find_by(ant_params) || Annotation.create(ant_params)
    
        {
          id: annotation.id,
          katagami_url: ant_params[:katagami].presigned_url,
          katagami_width: ant_params[:katagami].width,
          katagami_height: ant_params[:katagami].height
        }
      end
    end
end