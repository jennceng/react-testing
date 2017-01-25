class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :body
end
