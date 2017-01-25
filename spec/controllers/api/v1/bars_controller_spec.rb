require "rails_helper"

RSpec.describe Api::V1::BarsController, type: :controller do
  describe "GET #index" do
    let(:drink) { Bar.create(name: "Drink", address: "348 Congress St", hours_of_operation: "4PM-1AM", cover_charge: "none") }
    let(:charlies) { Bar.create(name: "Charlie's Kitchen", address: "10 Eliot St", hours_of_operation: "11AM-1AM") }

    let!(:drink_review_1) { Review.create(bar: drink, rating: 5, body: Faker::Hipster.paragraph(2)) }
    let!(:drink_review_2)  { Review.create(bar: drink, rating: 4, body: Faker::Hipster.paragraph(2)) }
    let!(:drink_review_3)  { Review.create(bar: drink, rating: 5, body: Faker::Hipster.paragraph(2)) }
    let!(:charlies_review_1) { Review.create(bar: charlies, rating: 5, body: Faker::Hipster.paragraph(2)) }

    it "should return all bars and their associated reviews" do
      get :index
      json = JSON.parse(response.body)

      expect(json["bars"].length).to eq(2)
      expect(json["bars"][0]["name"]).to eq("Drink")
      expect(json["bars"][1]["name"]).to eq("Charlie's Kitchen")

      expect(json["bars"][0]["reviews"].length).to eq(3)
      expect(json["bars"][1]["reviews"].length).to eq(1)

      expect(json["bars"][1]["reviews"][0]["id"]).to eq(charlies_review_1.id)
      expect(json["bars"][1]["reviews"][0]["rating"]).to eq(5)
      expect(json["bars"][1]["reviews"][0]["body"]).to eq(charlies_review_1.body)
    end
  end
end
