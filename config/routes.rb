Rails.application.routes.draw do
  root 'static_pages#index'
  # User
  devise_for :users, controllers: { 
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions'
  }
  devise_scope :user do
    get '/users/sign_out' => 'users/sessions#destroy'
    get '/users/sign_in' => 'users/sessions#create'
    get '/users/:id' => 'users#show'
  end
  
  # Katagami
  get '/katagamis/:owned_user/:page/:per/:sorting', to: 'katagamis#index'
  get '/katagamis/:id', to: 'katagamis#show'
  # Annotation
  post '/annotations/add_has_labels', to: 'annotations#add_has_labels'
  post '/annotations/:katagami', to: 'annotations#create'
  # Label
  get '/labels/target/:katagami/:num', to: 'labels#target'
end
