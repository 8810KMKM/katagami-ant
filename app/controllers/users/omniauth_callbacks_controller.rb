class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  protect_from_forgery

  def google
    @user = User.find_for_google(request.env['omniauth.auth'])
    
    if @user.persisted?
      sign_in @user
      Katagami.refresh_url
      redirect_to ENV['FRONT_URL'] + 'auth/' + payload(@user)[:auth_token] + '/' + (@user.have_done_all_annotations? ? '0' : '1')
    else
      redirect_to root_path
    end
  end

  def after_omniauth_failure_path_for resources
    root_path
  end

  private
    def payload(user)
      return nil unless user && user.id
      {
        auth_token: JsonWebToken.encode({
          user_id: user.id, 
          exp: (Time.now + 1.day).to_i
        }),
        user: { id: user.id, email: user.email }
      }
    end
end
