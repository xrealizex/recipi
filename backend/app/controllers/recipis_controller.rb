class RecipisController < ApplicationController
  def index
    recipis = Recipi.all
    render json: recipis
  end

  def create
    Recipi.create(recipi_params)
    head :created
  end
  
  private

  def recipi_params
    params.permit(:title, :description, :category, :easiness)
  end
end
