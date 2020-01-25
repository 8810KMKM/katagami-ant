class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  protect_from_forgery

  def google
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user 
      redirect_to ENV['FRONT_URL']
    else
      redirect_to root_path
    end
  end
end
