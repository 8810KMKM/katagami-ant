class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google 
    @user = User.find_for_google(request.env['omniauth.auth'])
    sign_in @user if @user.persisted?
    render json: { user: @user  }
  end
end
