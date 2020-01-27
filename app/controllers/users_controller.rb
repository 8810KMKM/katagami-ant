class UsersController < ApplicationController
  before_action :authenticate_request!

  def show
    render json: User.detail(
      params[:id] == 'my_page' ? current_user.id : params[:id]
    )
  end
end 
