# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Bar.find_or_create_by(name: "Paddy's Pub", address: "Philadelphia", hours_of_operation: "whenever Charlie turns on the 'coors' light")
Bar.find_or_create_by(name: "Suds", address: "Also Philly")
Bar.find_or_create_by(name: "Phoenix Landing", address: "Central Square", cover_charge: "10 bucks after 10pm")
Bar.find_or_create_by(name: "Backbar", address: "union square discreet alley", cover_charge: "none")


Bar.all.each do |bar|
  10.times do
    Review.find_or_create_by(bar: bar, rating: rand(4) + 1, body: Faker::Hipster.paragraph(2))
  end
end
