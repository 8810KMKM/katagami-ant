# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  protect_from_forgery
  before_action :authenticate_user!

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    redirect_to user_google_omniauth_authorize_path
  end

  # DELETE /resource/sign_out
  def destroy
    sign_out current_user
    render json: { user: nil }
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
