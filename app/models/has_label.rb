class HasLabel < ApplicationRecord
  belongs_to :label
  belongs_to :annotation
  belongs_to :katagami

  validates :position, 
              presence: true, 
              allow_nil: false, 
              uniqueness: { scope: [:annotation_id, :label_id] }
end
