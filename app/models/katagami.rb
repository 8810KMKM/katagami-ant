class Katagami < ApplicationRecord
  require 'aws-sdk'

  validates :name, presence: true, allow_nil: false
  validates :cw_obj, presence: true, allow_nil: false
  validates :width, presence: true, allow_nil: false
  validates :height, presence: true, allow_nil: false

  has_many :annotations

  mount_uploader :cw_obj, KatagamiUploader

  def self.s3_bucket
    Aws::S3::Resource.new(
      region: 'ap-northeast-1',
      access_key_id: ENV['S3_ACCESS_KEY_ID'],
      secret_access_key: ENV['S3_SECRET_ACCESS_KEY']
    ).bucket('katagami-ant')
  end

  def presigned_url
    target = Katagami.s3_bucket.objects.select { |object| object.key === src }
    target[0].presigned_url(:get)
  end
end
