class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end
  
  def signup
    user = User.create(
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )

    render json: { 
      auth: user.id,
      email: user.email,
      errors: format_error_messages(user)
    }
  end

  def login
    user = User.find_by(email: params[:email])
    errors = {}
    auth = nil

    if user.present?
      if !!user.authenticate(params[:password])
        auth = user.id
      else
        errors[:password] = "パスワードが間違っています"
      end
    else
      errors[:email] = "登録されていないメールアドレスです"
    end

    render json: { 
      auth: auth,
      email: user.email,
      errors: errors
    }
  end

  private
    def format_error_messages(user)
      _errors = user.errors.full_messages
      errors = {}

      _errors.each do |error|
        case error
        when "メールアドレスは不正な値です" then
          errors[:email] = "メールアドレスが正しくありません"
        when "メールアドレスはすでに存在します" then
          errors[:email] = "このメールアドレスは既に登録されています"
        when "パスワードは6文字以上で入力してください" then
          errors[:password] = "パスワードは6文字以上で入力してください"
        when "パスワード(確認)とパスワードの入力が一致しません" then
          errors[:password_confirmation] = "再入力されたパスワードが一致しません"
        end
      end
      errors
    end
end
