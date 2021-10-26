Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "ideas#index"
  resources :ideas do
    resources :likes, shallow: true, only: [:show, :create, :destroy]
    get :liked, on: :collection
    resources :joins, shallow: true, only: [:show, :create, :destroy]
    get :joined, on: :collection
    resources :reviews
  end

  resources :users, only:[:new, :create, :show ]
  resource :session, only:[:new, :create, :destroy]

  get("/dashboard", to:"users#dashboard")
end
