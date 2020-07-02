class ExerciseExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :workout_execution
  belongs_to :exercise

  has_many :set_executions, dependent: :destroy
end
