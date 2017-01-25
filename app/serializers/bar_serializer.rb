class BarSerializer < ActiveModel::Serializer
  attributes :id,
  :name,
  :url,
  :average_rating,
  :editable
  # ,:reviews

  # the below uses the review serializer unlike line 7 which gives all the info
  has_many :reviews
  # embed :ids, include: true

  def url
    url_for(object)
  end

  def editable
    scope.admin?
    # || object.creator?(scope)
    # what is scope? current_user
  end
end
