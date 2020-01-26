class UsersController < ApplicationController
  before_action :authenticate_request!

  def show
    render json: User.detail(params[:id])
  end
end 
