class Api::V1::BarsController < ApplicationController
  def index
    @bars = Bar.all
    render json: @bars
    # fyi the above automatically uses my bar_serializer
  end
end
