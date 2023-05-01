class RecipesController < ApplicationController
  def index
    recipes = Recipe.all
    render json: recipes
  end

  def create
    Recipe.create(recipe_params)
    head :created
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
    head :ok
  end

  def random
    @recipe = Recipe.order("RANDOM()").first
    render json: @recipe
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end

  private

  def recipe_params
    params.permit(:title, :description, :category, :easiness)
  end
end
