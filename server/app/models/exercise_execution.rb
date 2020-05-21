class ExerciseExecution < ApplicationRecord
  belongs_to :workout_execution
  belongs_to :exercise

  has_many :set_execs
end
