class RecipisController < ApplicationController
  def index
    recipis = Recipi.all
    render json: recipis
  end
end
