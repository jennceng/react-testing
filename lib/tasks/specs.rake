if defined?(RSpec)
  namespace :specs do
    desc "Run factory specs"
    RSpec::Core::RakeTask.new(:factories) do |t|
      t.verbose = false
      t.pattern = "./spec/support/factories/factories_spec.rb"
    end

    desc "Run all unit tests"
    RSpec::Core::RakeTask.new(:units) do |t|
      t.verbose = false
      t.pattern = Dir['spec/*/**/*_spec.rb'].reject { |f| f['/features'] }
    end

    desc "Run all feature tests"
    task features: :environment do
      system('rspec spec/features')
    end

    desc "Run all React tests"
    task frontend: :environment do
      system('npm test -- --single-run')
    end
  end
end
