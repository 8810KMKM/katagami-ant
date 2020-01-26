class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :trackable, :omniauthable, omniauth_providers: %i(google)
  has_many :annotations
  attr_accessor :password

  def self.detail(id)
    Rails.cache.fetch('user-' + id) do
      user = User.includes(annotations: [{katagami: :annotations}]).find(id)
      {
        id: id,
        email: user.email,
        katagamis: user.annotations.map {|annotation| 
          katagami = annotation.katagami
          {
            id: katagami.id,
            name: katagami.name,
            annotation_num: katagami.annotations.size,
          }
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
