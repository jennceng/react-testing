# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path("../config/application", __FILE__)

Rails.application.load_tasks

if Rails.env.development? || Rails.env.test?
  Rake::Task['default'].prerequisites.clear
  Rake::Task['default'].clear
end

task default: ['specs:frontend', 'spec']
