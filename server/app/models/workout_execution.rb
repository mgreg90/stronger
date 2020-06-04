class WorkoutExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson
  belongs_to :user

  has_many :exercise_executions
end
