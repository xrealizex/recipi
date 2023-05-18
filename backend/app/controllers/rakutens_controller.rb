class RakutensController < ApplicationController
  def index
    keyword = params[:keyword]
    recipes = Recipe.search(keyword)
    render json: recipes
  end
end
