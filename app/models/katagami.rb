class Katagami < ApplicationRecord
  require 'aws-sdk'

  validates :name, presence: true, allow_nil: false
  validates :cw_obj, presence: true, allow_nil: false
  validates :width, presence: true, allow_nil: false
  validates :height, presence: true, allow_nil: false

  has_many :annotations
  has_many :has_labels

  mount_uploader :cw_obj, KatagamiUploader

  # 全型紙のidと合わせて, ログインユーザのアノテーション状況(達成度)を取得
  def self.ant_statuses(user)
    includes(annotations: [:user]).where(annotations: {user_id: user})
    .pluck(:id, :'annotations.status').to_h
  end

  def self.listing_for_top(params)
    katagamis = Katagami.all.pluck(:id, :name, :ant_num)
    statuses = ant_statuses(params[:user])

    top = (params[:page].to_i - 1) * params[:per].to_i
    bottom = top + params[:per].to_i - 1
    sortIndex = params[:sorting].to_i

    katagamis
      .map  {|k| k << (statuses[k[0]] ? statuses[k[0]] : 0)}
      .sort {|a, b| a[sortIndex] <=> b[sortIndex]}[top..bottom]
      .format_for_responce(katagamis.size)
  end

  def self.listing_for_user(params)
    includes(:annotations)
      .where(annotations: {user_id: params[:owned_user]}).order(:id)
      .page(params[:page]).per(params[:per])
      .pluck(:id, :name, :ant_num, :'annotations.status')
      .format_for_responce
  end

  def self.s3_bucket
    Aws::S3::Resource.new(
      region: 'ap-northeast-1',
      access_key_id: ENV['S3_ACCESS_KEY_ID'],
      secret_access_key: ENV['S3_SECRET_ACCESS_KEY']
    ).bucket('katagami-ant')
  end

  def presigned_url
    target = Katagami.s3_bucket.objects.select { |object| object.key === name }
    target[0].presigned_url(:get)
  end
end

class Array
  def format_for_responce(count=self.size)
    {
      count: count,
      katagamis: self.map {|k| {
        id: k[0],
        name: k[1],
        annotation_num: k[2],
        status: k[3]
      }}
    }
  end
end
