class Label < ApplicationRecord
  validates :name, presence: true, allow_nil: false
  has_many :has_labels

  class << self
    def listing
      Rails.cache.fetch('labels') do
        all.pluck(:name)
      end
    end
  
    def listing_for_ant(params, user_id)
      annotation = Annotation.find_by(katagami_id: params[:katagami], user_id: user_id)
      head = annotation ? annotation.status : 0
      tail = head + params[:num].to_i - 1
  
      head === 10 ? 
        [] : all.pluck(:id, :name)[head..tail].map {|l| { id: l[0], name: l[1] }}
    end
  end
end
