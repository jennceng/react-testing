class Bar < ApplicationRecord
  has_many :reviews, dependent: :destroy

  validates :name, presence: true
  validates :address, presence: true

  def average_rating
    ratings = reviews.pluck(:rating)
    ratings.reduce(:+) / ratings.size.to_f
  end
end
