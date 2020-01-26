class AuthController < ActionController::Base
  protect_from_forgery
  before_action :authenticate_request!
end 
