class BarsController < ApplicationController
  def show
    @bar = Bar.find(params[:id])
    @reviews = @bar.reviews
  end
end
