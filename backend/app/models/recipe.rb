class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :title, length: { maximum: 30 }
  validates :category, presence: true
  validates :easiness, presence: true

  belongs_to :user
end
