class Katagami < ApplicationRecord
  require 'aws-sdk'

  validates :name, presence: true, allow_nil: false
  validates :cw_obj, presence: true, allow_nil: false
  validates :width, presence: true, allow_nil: false
  validates :height, presence: true, allow_nil: false

  has_many :annotations
  has_many :has_labels

  mount_uploader :cw_obj, KatagamiUploader

  @@_count = 0

  # 全型紙のidと合わせて, ログインユーザのアノテーション状況(達成度)を取得
  def self.ant_statuses(user)
    includes(annotations: [:user]).where(annotations: {user_id: user})
    .pluck(:id, :'annotations.status').to_h
  end

  # 指定されたページ内の型紙一覧
  def self.pagination(params)
    case params[:sorting]
    when '1' # 達成度の昇順
      condition = ['annotations.status', :id]
    when '2' # ユーザー数の昇順
      condition = [:ant_num, :id]
    else # 指定なし
      condition = :id
    end

    includes(:annotations).order(condition).page(params[:page]).per(params[:per])
    .pluck(:id, :name, :ant_num)
  end

  # トップページの型紙一覧
  def self.listing_for_top(params)
    katagamis = Katagami.pagination(params)
    ant_statuses = Katagami.ant_statuses(params[:user])

    {
      count: Katagami._count,
      katagamis: katagamis.map {|katagami|
        status = ant_statuses.find {|k, v| k == katagami[0]}
        {
          id: katagami[0],
          name: katagami[1],
          annotation_num: katagami[2],
          status: status ? status[1] : 0
        }
      }
    }
  end

  def self.listing_for_user(params)
    katagamis = includes(:annotations)
                  .where(annotations: {user_id: params[:owned_user]}).order(:id)
                  .page(params[:page]).per(params[:per])
                  .pluck(:id, :name, :ant_num, :'annotations.status')
                  .map {|katagami| {
                    id: katagami[0],
                    name: katagami[1],
                    annotation_num: katagami[2],
                    status: katagami[3]
                  }}

    {
      count: katagamis.size,
      katagamis: katagamis
    }
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

  def self._count
    @@_count = self.count if @@_count == 0
    @@_count
  end

  def self.add_count n
    @@_count += n
    p @@_count
  end
end
