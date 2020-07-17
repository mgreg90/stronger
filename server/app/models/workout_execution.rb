class WorkoutExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :user

  has_many :exercise_executions, dependent: :destroy

  default_scope -> { order_by_latest }

  scope :active, -> { where finished_at: nil }
  scope :completed, -> { where.not finished_at: nil }
  scope :order_by_latest, -> { order created_at: :desc }
  scope :with_sets, -> { includes(exercise_executions: [{ exercise: :exercise_types }, :set_executions]) }
end
