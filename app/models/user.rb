class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :trackable, :omniauthable, omniauth_providers: %i(google)
  has_many :annotations
  attr_accessor :password

  def self.detail(id)
    Rails.cache.fetch('user-' + id) do
      user = User.includes(:annotations).find(id)
      annotations = user.annotations.pluck(:id, :status)
  
      {
        id: id,
        email: user.email,
        katagami_counts: {
          doing: annotations.select {|a| a[1].between?(1, 9)}.size,
          done:  annotations.select {|a| a[1] == 10}.size
        }
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
