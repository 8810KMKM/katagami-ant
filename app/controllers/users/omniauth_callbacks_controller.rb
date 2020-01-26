class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  protect_from_forgery

  def google
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user 
      redirect_to ENV['FRONT_URL']
      # decode token を url に乗せて送る
      # redirect_to ENV['FRONT_URL'] + token
    else
      redirect_to root_path
    end
  end
end
