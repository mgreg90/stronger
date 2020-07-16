class WorkoutExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :user

  has_many :exercise_executions

  default_scope -> { order_by_latest }

  scope :active, -> { where finished_at: nil }
  scope :completed, -> { where.not finished_at: nil }
  scope :order_by_latest, -> { order created_at: :desc }
end
