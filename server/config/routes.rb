Rails.application.routes.draw do
  get 'client_app/index'

  namespace :api do
    namespace :v1 do
      namespace :exercises do
        resources :search, only: %i(create)
      end

      resources :exercise_executions, only: %i(create show)
      resources :sessions, only: %i(create)
      resources :set_executions, only: %i(create update)
      resources :users, only: %i(create)
      resources :workout_executions, only: %i(create show update)
    end
  end
  
  # Redirect all routes to client app
  # Exclude active_storage routes so that images load correctly.
  # https://github.com/rails/rails/issues/31228
  get '*path', to: 'client_app#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
