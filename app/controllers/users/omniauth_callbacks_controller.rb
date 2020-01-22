class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      p 'success'
      p user_signed_in?
      p current_user
      redirect_to 'https://github.com/8810KMKM/katagami-ant'
    else
      p 'failure'
      redirect_to user_google_omniauth_authorize_path
    end
  end
end