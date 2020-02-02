class Katagami < ApplicationRecord
  require 'aws-sdk'

  validates :name, presence: true, allow_nil: false
  validates :cw_obj, presence: true, allow_nil: false
  validates :width, presence: true, allow_nil: false
  validates :height, presence: true, allow_nil: false

  has_many :annotations
  has_many :has_labels

  mount_uploader :cw_obj, KatagamiUploader

  class << self
    # 全型紙のidと合わせて, ログインユーザのアノテーション状況(達成度)を取得
    def ant_statuses(user)
      includes(annotations: [:user]).where(annotations: {user_id: user})
      .pluck(:id, :'annotations.status').to_h
    end

    # トップページの型紙一覧
    def listing_for_top(params, user_id)
      Rails.cache.fetch('katagamis-' + user_id.to_s + params[:page] + params[:per] + params[:sorting]) do
        katagamis = Katagami.all.pluck(:id, :name, :s3_url, :ant_num)
        statuses = ant_statuses(user_id)

        top = (params[:page].to_i - 1) * params[:per].to_i
        bottom = top + params[:per].to_i - 1
        sortIndex = params[:sorting].to_i

        katagamis
          .map  { |k| k << (statuses[k[0]] ? statuses[k[0]] : 0) }
          .sort { |a, b| a[sortIndex] <=> b[sortIndex] }[top..bottom]
          .format_for_index
      end
    end

    # ユーザーページの型紙一覧
    def listing_for_user(params)
      Rails.cache.fetch('katagamis-owned-' + params[:owned_user] + params[:page] + params[:per]) do
        includes(:annotations)
          .where(annotations: {user_id: params[:owned_user], status: [1..10]}).order(:id)
          .page(params[:page]).per(params[:per])
          .pluck(:id, :name, :s3_url, :ant_num, :'annotations.status')
          .format_for_index
      end
    end

    # アノテーション結果ページのリソース
    def ant_result(params)
      katagami = includes(annotations: [:user, {has_labels: :label}]).find(params[:id])

      {
        katagami_url: katagami.s3_url,
        katagami_width: katagami.width,
        katagami_height: katagami.height,
        annotation_num: katagami.annotations.size,
        whole_labels: Label.listing,
        has_labels: katagami.classified_has_labels
      }
    end

    def s3_bucket
      Aws::S3::Resource.new(
        region: 'ap-northeast-1',
        access_key_id: ENV['S3_ACCESS_KEY_ID'],
        secret_access_key: ENV['S3_SECRET_ACCESS_KEY']
      ).bucket('katagami-ant')
    end

    def refresh_url
      find_each { |k| k.presigned_url }
    end
  end

  # division > position > labelでhas_labelをクラス分け
  def classified_has_labels
    Rails.cache.fetch('has_labels-' + id.to_s) do
      annotations
        .map { |ant| 
          ant.has_labels.map {|has_label| 
            {
              user: ant.user.id.to_s + ' ' + ant.user.email,
              position: has_label.position,
              division: has_label.division,
              label: has_label.label.name
            }
          }
        }
        .flatten.group_by { |has_label| has_label[:division] }
        .map { |k, v| v
          .group_by { |label| label[:position] }
          .map { |k, v| 
            {
              position: k,
              score: v.group_by { |v| v[:label] }.each{ |_, v| v.map! { |h| h[:user] } }
            }
          }
        }
    end
  end

  # 型紙一覧の全キャッシュと自身の持つHasLabelのキャッシュをクリア
  def clear_caches
    Rails.cache.instance_variable_get(:@data).keys.each {|k| 
      Rails.cache.delete(k) if k.match(/katagamis/)
    }
    Rails.cache.delete('has_labels-' + id.to_s)
  end

  def plus_ant_num(n=1)
    update(ant_num: ant_num + n)
  end

  # S3バケットに対して認証済みurlを取得
  # デフォルトの有効期限が1時間なので, それに対応してfetchさせる.
  def presigned_url
    Rails.cache.fetch('katagami-' + id.to_s) do
      target = Katagami.s3_bucket.objects.select { |object| object.key === name }
      update(s3_url: target[0].presigned_url(:get, expires_in: 60 * 60 * 24))
      s3_url
    end
  end
end

class Array
  def format_for_index(count=self.size)
    {
      count: count,
      katagamis: self.map {|k| {
        id: k[0],
        name: k[1],
        url: k[2],
        annotation_num: k[3],
        status: k[4] 
      }}
    }
  end
end
