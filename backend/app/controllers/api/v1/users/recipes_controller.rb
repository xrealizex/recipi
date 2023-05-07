module Api
  module V1
    module Users
      class RecipesController < ApplicationController
        before_action :authenticate_api_v1_user!

        def index
          recipes = current_api_v1_user.recipes
          render json: recipes
        end

        def create
          recipe = current_api_v1_user.recipes.build(recipe_params)
          if recipe.save
            render json: recipe, status: :created
          else
            render json: recipe.errors, status: :unprocessable_entity
          end
        end

        def update
          recipe = current_api_v1_user.recipes.find(params[:id])
          if recipe.update(recipe_params)
            render json: recipe
          else
            render json: recipe.errors, status: :unprocessable_entity
          end
        end

        def destroy
          recipe = current_api_v1_user.recipes.find(params[:id])
          recipe.destroy
          head :no_content
        end

        def random
          recipe = current_api_v1_user.recipes.order("RANDOM()").first
          render json: recipe
        end

        def show
          recipe = current_api_v1_user.recipes.find(params[:id])
          render json: recipe
        end

        private

        def recipe_params
          params.permit(:title, :description, :category, :easiness)
        end
      end
    end
  end
end
