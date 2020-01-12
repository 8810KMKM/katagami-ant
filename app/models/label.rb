class Label < ApplicationRecord
  validates :name, presence: true, allow_nil: false

  has_many :has_labels

  def self.listing
    Rails.cache.fetch('labels') do
      Label.all.pluck(:name)
    end
  end

  def self.listing_for_ant(params)
    annotation = Annotation.find_by(katagami_id: params[:katagami], user_id: params[:user])
    rest_num = annotation ? 10 - annotation.status : 10
    target_num = params[:num].to_i

    rest_num - target_num < 0 ?
      [] : Label.where(id: [1..rest_num]).order(id: 'DESC').limit(target_num)
  end
end
