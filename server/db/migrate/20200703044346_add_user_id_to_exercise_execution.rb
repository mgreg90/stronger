class AddUserIdToExerciseExecution < ActiveRecord::Migration[6.0]
  def change
    add_reference :exercise_executions, :user, index: true, foreign_key: true

    ExerciseExecution.all.includes(:workout_execution).each do |ex_exec|
      ex_exec.user_id = ex_exec.workout_execution.user_id
      ex_exec.save!
    end

    change_column_null :exercise_executions, :user_id, false
  end
end
