Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :users do
        get '/recipes/random', to: 'users/recipes#random'
        resources :recipes, only: [:index, :show, :create, :destroy], module: :users
        resources :favorites, only: [:index, :create, :destroy], module: :users
      end
    end
  end
  get '/recipes/random', to: 'recipes#random'
end
