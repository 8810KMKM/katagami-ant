class UsersController < ActionController::Base
  protect_from_forgery
  before_action :authenticate_user!

  def hoge
    redirect_to user_google_omniauth_authorize_path
  end
end 
