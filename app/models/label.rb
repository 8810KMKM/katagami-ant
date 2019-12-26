class Label < ApplicationRecord
  validates :name, presence: true, allow_nil: false

  has_many :has_labels
end
