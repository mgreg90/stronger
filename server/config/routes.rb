Rails.application.routes.draw do
  get 'client_app/index'
  namespace :api do
    namespace :v1 do
      resources :users, only: %i(create)
      resources :sessions, only: %i(create)
    end
  end
  
  # Redirect all routes to client app
  # Exclude active_storage routes so that images load correctly.
  # https://github.com/rails/rails/issues/31228
  get '*path', to: 'client_app#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
