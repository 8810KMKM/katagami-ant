class UsersController < ApplicationController
  before_action :authenticate_request!

  def show
    render json: params[:id] ?
      User.detail(params[:id]) : User.detail(current_user.id)
  end
end 
