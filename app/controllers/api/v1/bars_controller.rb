class Api::V1::BarsController < ApplicationController
  def index
    @bars = Bar.all
    render json: @bars, serializer: nil
    # fyi the above automatically uses my bar_serializer
  end

  def show
    @bar = Bar.find(params[:id])
    render json: @bar
  end
end
