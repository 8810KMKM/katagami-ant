class Annotation < ApplicationRecord
  validates :status, inclusion: { in: %w(0 1 2) }

  belongs_to :user
  belongs_to :katagami
end
