class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :trackable, :omniauthable, omniauth_providers: %i(google)
  has_many :annotations
  attr_accessor :password

  class << self
    def detail(id)
      Rails.cache.fetch('user-' + id.to_s) do
        user = User.includes(:annotations).find(id)
        annotations = user.annotations.pluck(:id, :status)
        doing = annotations.count { |a| a[1].between?(1, 9) }
        done = annotations.count { |a| a[1] == 10 }
  
        {
          id: id,
          email: user.email,
          ant_counts: [
            { status: 'DOING', count: doing },
            { status: 'DONE',  count: done },
            { status: 'YET',   count: Katagami.count - (doing + done) }
          ]
        }
      end
    end
  end

  def have_done_all_annotations?
    (Katagami.all.pluck(:id) - annotations.pluck(:katagami_id, :status).select {|a| a[1] == 10}.to_h.keys).size < 0
  end

  def recommended_katagami_id
    all_ids = Katagami.all.pluck(:id)
    doing_or_done_statuses = annotations.pluck(:katagami_id, :status).to_h
    yet_ids = all_ids - doing_or_done_statuses.keys

    if yet_ids.size > 0
      yet_ids[0]
    else
      recommend = doing_or_done_statuses.sort {|a, b| a[1] <=> b[1]}[0]
      recommend[1] == 10 ? -1 : recommend[0]
    end
  end

  protected
  def self.find_for_google(auth)
    user = User.find_by(email: auth.info.email)

    unless user
      user = User.create(
        email:    auth.info.email,
        provider: auth.provider,
        uid:      auth.uid,
        token:    auth.credentials.token,
        password: Devise.friendly_token[0, 20],
        # meta:     auth.to_yaml
      )
    end
    user
  end
end
