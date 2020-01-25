class StaticPagesController < ActionController::Base
  protect_from_forgery

  def index
    redirect_to user_signed_in? ?
      ENV['FRONT_URL'] : '/welcome'
  end
end 