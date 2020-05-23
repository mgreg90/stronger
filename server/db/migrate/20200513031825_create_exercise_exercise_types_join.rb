class CreateExerciseExerciseTypesJoin < ActiveRecord::Migration[6.0]
  def change
    create_table :exercise_exercise_types_join do |t|
      t.references :exercise
      t.references :exercise_type

      t.timestamps
    end
  end
end
