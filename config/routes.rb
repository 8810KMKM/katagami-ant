Rails.application.routes.draw do
  # User
  post '/signup', to: 'users#signup'
  post '/login' , to: 'users#login'
  get 'users/:id', to: 'users#show'
  # Katagami
  post '/katagamis/:page/:per', to: 'katagamis#index'
  get 'katagamis/hoge', to: 'katagamis#hoge'
  # Annotation
  post '/annotations/:katagami_id/:user_id', to: 'annotations#create'
  post '/annotations/add_has_labels', to: 'annotations#add_has_labels'
  # Label
  get '/labels', to: 'labels#get_random'
end
