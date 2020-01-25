class StaticPagesController < ActionController::Base
  protect_from_forgery

  def index
    if user_signed_in?
      redirect_to ENV['FRONT_URL']
    else
      redirect_to '/welcome'
    end
    
  end
end 