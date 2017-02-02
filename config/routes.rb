Rails.application.routes.draw do
  root "home#index"

  namespace :api do
    namespace :v1 do
      resources :bars, only: [:index]
    end
  end
end
