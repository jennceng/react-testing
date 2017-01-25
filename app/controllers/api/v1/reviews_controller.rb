class Api::V1::ReviewsController < ApplicationController
  def edit
    # binding.pry
    @review = Review.find(params[:id])
    render json: @review.to_json
  end

end
