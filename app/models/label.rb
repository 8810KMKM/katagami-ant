class Label < ApplicationRecord
  validates :name, presence: true, allow_nil: false

  has_many :has_labels

  def self.listing
    Rails.cache.fetch('labels') do
      Label.all.pluck(:name)
    end
  end
end
