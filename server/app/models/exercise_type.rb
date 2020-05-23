class ExerciseType < ApplicationRecord
  has_many :exercise_exercise_types
  has_many :exercises, through: :exercise_exercise_types

  validates :name, uniqueness: true
end
