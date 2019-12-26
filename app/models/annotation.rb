class Annotation < ApplicationRecord
  validates :status, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 2 }
  validates :user_id, uniqueness: { scope: :katagami_id }
  
  belongs_to :user
  belongs_to :katagami

  has_many :has_labels
end
