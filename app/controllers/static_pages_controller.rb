class StaticPagesController < ActionController::Base
  protect_from_forgery

  def index
    redirect_to '/welcome'
  end
end 