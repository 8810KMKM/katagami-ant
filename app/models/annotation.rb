class Annotation < ApplicationRecord
  validates :status, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
  validates :user_id, uniqueness: { scope: :katagami_id }
  
  belongs_to :user
  belongs_to :katagami

  has_many :has_labels

  # アノテーション実行開始
  def self.stand_by(katagami_id, user_id)
    katagami = Katagami.find(katagami_id)
    ant_params = { katagami: katagami, user: User.find(user_id)}
    annotation = find_by(ant_params) || create(ant_params) 
    
    {
      id: annotation.id,
      katagami_url: katagami.presigned_url,
      katagami_width: katagami.width,
      katagami_height: katagami.height
    }
  end

  # アノテーション結果を保存
  def save_result(params)
    new_status = status

    HasLabel.transaction do
      # {has_labels: 'label_id division [positions],label_id division [positions]'}
      params[:has_labels].split(',').each do |has_label|
        add(has_label)
        new_status += 1
      end
    end
      katagami.plus_ant_num if status == 0
      update(status: new_status)
      katagami.clear_caches
      Rails.cache.delete('user-' + user_id.to_s)
      has_labels
    rescue => e
      p e.message
      []
  end

  # 自身に紐付くHasLabel生成
  def add(has_label)
    _has_label = has_label.split(' ').map { |n| n.to_i }
    label_id = _has_label.shift # has_labelの先頭はlabel_id

    if ENV['RAILS_ENV'] == 'production' && label_id != '1'
      label_id = label_id * 10 + 1
    end

    label = Label.find(label_id) 
    division = _has_label.shift # その次はdivision

    _has_label.each {|position|
      HasLabel.create(
        annotation: self, katagami: katagami, label: label, division: division, position: position
      )
    }
  end
end
