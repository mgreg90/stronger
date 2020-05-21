class WorkoutExecution < ApplicationRecord
  belongs_to :user

  has_many :exercise_executions
end
