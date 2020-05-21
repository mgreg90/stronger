class CreateExerciseExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :exercise_executions do |t|
      t.references :workout_execution, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true

      t.timestamps
    end
  end
end
