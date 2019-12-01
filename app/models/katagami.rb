class Katagami < ApplicationRecord
  validates :src, presence :true, allow_nil: false
  validates :width, presence :true, allow_nil: false
  validates :height, presence :true, allow_nil: false
end
