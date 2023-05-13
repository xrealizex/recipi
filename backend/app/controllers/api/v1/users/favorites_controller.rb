module Api
  module V1
    module Users
      class FavoritesController < ApplicationController
        before_action :authenticate_api_v1_user!

        def index
          favorites = current_api_v1_user.favorites.includes(:recipe)
          render json: favorites.as_json(include: :recipe)
        end

        def create
          favorite = current_api_v1_user.favorites.build(recipe_id: params[:recipe_id])
          if favorite.save
            render json: { status: 'SUCCESS', message: 'お気に入りに追加しました。' }
          else
            render json: { status: 'ERROR', message: 'お気に入りの追加に失敗しました。', data: favorite.errors }, status: :unprocessable_entity
          end
        end

        def destroy
          favorite = current_api_v1_user.favorites.find_by(recipe_id: params[:recipe_id])
          if favorite&.destroy
            render json: { status: 'SUCCESS', message: 'お気に入りから削除しました。' }
          else
            render json: { status: 'ERROR', message: 'お気に入りの削除に失敗しました。' }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
