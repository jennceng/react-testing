class BarSerializer < ActiveModel::Serializer
  attributes
    :id,
    :name,
    :average_rating

  has_many :reviews
end
