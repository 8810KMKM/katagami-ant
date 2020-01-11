class KatagamisController < ApplicationController
  def index
    # ユーザーページ内の一覧 (アノテーション済みの型紙のみ)
    if params[:owned_user] != '0'
      render json: Katagami.listing_for_user(params)
    else
      render json: Katagami.listing_for_top(params)
    end
  end

  def show
    katagami = Katagami.includes(annotations: [:user, {has_labels: :label}]).find(params[:id])

    has_labels_by_position = katagami.annotations.map {|ant| 
      ant.has_labels.map {|has_label| 
        {
          user: ant.user.id.to_s + ' ' + ant.user.email,
          position: has_label.position, 
          label: has_label.label.name
        }
      }
    }.flatten.group_by {|label| label[:position]}
        
    render json: {
      katagami_url: katagami.presigned_url,
      katagami_width: katagami.width,
      katagami_height: katagami.height,
      annotation_num: katagami.annotations.size,
      whole_labels: Label.all.pluck(:name),
      has_labels: has_labels_by_position.map {|k, v| 
        {
          position: k,
          score: v.group_by {|v| v[:label]}.each{|_, v| v.map!{|h| h[:user]}}
        }
      }
    }
  end

  private

    def cache_image(katagami)
      Rails.cache.fetch('katagami_image-' + katagami.id) do
        katagami.presigned_url
      end
    end
end