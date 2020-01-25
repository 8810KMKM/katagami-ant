class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google
    
    
    
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user
      render json: { user: @user  }
    else
      render json: { user: nil  }
    end
  end
end