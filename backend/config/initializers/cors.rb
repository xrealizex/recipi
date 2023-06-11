# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000", "https://web.recipe-choice.shop", "https://recipe-choice.vercel.app"

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client", "Access-Control-Allow-Origin"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
