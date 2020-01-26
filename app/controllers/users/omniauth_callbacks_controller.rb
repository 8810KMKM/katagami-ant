class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  protect_from_forgery

  def google
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user
      render json: payload(@user)

      #redirect_to ENV['FRONT_URL'] + auth_payload[:auth_token]
    else
      redirect_to root_path
    end
  end

  private
    def payload(user)
      return nil unless user && user.id
      {
        auth_token: JsonWebToken.encode({
          user_id: user.id, 
          exp: (Time.now + 1.hour).to_i
        }),
        user: { id: user.id, email: user.email }
      }
    end
end
