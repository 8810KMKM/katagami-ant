Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  # User
  get '/hoge', to: 'users#hoge', as: 'new_session'
  post '/signup', to: 'users#signup'
  post '/login' , to: 'users#login'
  get 'users/:id', to: 'users#show'
  # Katagami
  get '/katagamis/:user/:page/:per/:owned_user/:sorting', to: 'katagamis#index'
  get '/katagamis/:id', to: 'katagamis#show'
  # Annotation
  post '/annotations/:katagami/:user', to: 'annotations#create'
  post '/annotations/add_has_labels', to: 'annotations#add_has_labels'
  # Label
  get '/labels', to: 'labels#get_random'
  get '/labels/target/:katagami/:user/:num', to: 'labels#target'
end
