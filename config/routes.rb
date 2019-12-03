Rails.application.routes.draw do
  # User
  post '/signup', to: 'users#signup'
  post '/login' , to: 'users#login'
  get 'users/:id', to: 'users#show'

  #Katagami
  get '/katagamis', to: 'katagamis#index'

  #Annotation
  post '/annotations/:katagami_id/:user_id', to: 'annotations#create'
end
