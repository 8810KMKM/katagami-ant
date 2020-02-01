class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :trackable, :omniauthable, omniauth_providers: %i(google)
  has_many :annotations
  attr_accessor :password

  def self.detail(id)
    Rails.cache.fetch('user-' + id.to_s) do
      user = User.includes(:annotations).find(id)
      annotations = user.annotations.pluck(:id, :status)
      doing = annotations.count {|a| a[1].between?(1, 9)}
      done = annotations.count {|a| a[1] == 10}

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
