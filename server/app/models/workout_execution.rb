class WorkoutExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :user

  has_many :exercise_executions, dependent: :destroy

  default_scope -> { order_by_latest }

  scope :active, -> { where finished_at: nil }
  scope :completed, -> { where.not finished_at: nil }
  scope :order_by_latest, -> { order created_at: :desc }
  scope :with_sets, -> { includes(exercise_executions: [{ exercise: :exercise_types }, :set_executions]) }

  def create_repeat
    repeat = build_repeat
    repeat.save!
    repeat
  end

  def build_repeat
    repeat = self.dup
    repeat.reset
    repeat.exercise_executions = self.exercise_executions.map(&:build_repeat)
    repeat
  end

  def reset
    %i(started_at finished_at created_at updated_at).each do |field|
      send("#{field}=", nil)
    end
  end
end
