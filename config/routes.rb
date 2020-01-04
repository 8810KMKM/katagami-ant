Rails.application.routes.draw do
  # User
  post '/signup', to: 'users#signup'
  post '/login' , to: 'users#login'
  get 'users/:id', to: 'users#show'
  # Katagami
  get '/katagamis/:user/:page/:per', to: 'katagamis#index'
  # Annotation
  post '/annotations/:katagami/:user', to: 'annotations#create'
  post '/annotations/add_has_labels', to: 'annotations#add_has_labels'
  # Label
  get '/labels', to: 'labels#get_random'
end
