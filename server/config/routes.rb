Rails.application.routes.draw do
  get 'client_app/index'

  namespace :api do
    namespace :v1 do
      resources :exercises, only: %i() do
        resource :previous_execution_summary, only: %i(show), controller: 'exercises/previous_execution_summary'
      end

      resource :exercises, only: %i() do
        resource :search, only: %i(create), controller: 'exercises/search'
      end

      resources :exercise_executions, only: %i(create show update destroy)

      resources :sessions, only: %i(create)
      resources :set_executions, only: %i(create update destroy)
      resources :users, only: %i(create)
      resources :workout_executions, only: %i(create show update)
    end
  end
  
  # Redirect all routes to client app
  # Exclude active_storage routes so that images load correctly.
  # https://github.com/rails/rails/issues/31228
  get '/(*path)', to: 'client_app#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
