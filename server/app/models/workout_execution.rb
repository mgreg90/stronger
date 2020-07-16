class WorkoutExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :user

  has_many :exercise_executions

  scope :active, -> { where finished_at: nil }
  scope :default_order, -> { order :created_at }
end
