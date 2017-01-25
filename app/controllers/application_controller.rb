class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  if !Rails.env.production?
    Rails.application.routes.default_url_options[:host] = 'localhost:3000'
  else
    Rails.application.routes.default_url_options[:host] = 'heroku.com/myawesomeappname'
  end

  private

  def current_user
    OpenStruct.new(admin?: false)
  end
  helper_method :current_user
end
