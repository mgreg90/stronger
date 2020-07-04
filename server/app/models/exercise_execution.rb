class ExerciseExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson

  belongs_to :exercise
  belongs_to :user
  belongs_to :workout_execution

  has_many :set_executions, dependent: :destroy
end
