class ExerciseExerciseType < ApplicationRecord
  self.table_name = 'exercise_exercise_types_join'
  belongs_to :exercise
  belongs_to :exercise_type
end
