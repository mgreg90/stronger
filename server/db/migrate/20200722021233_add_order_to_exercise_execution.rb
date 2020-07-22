class AddOrderToExerciseExecution < ActiveRecord::Migration[6.0]
  def up
    add_column :exercise_executions, :order, :integer

    WorkoutExecution.includes(:exercise_executions).all.find_in_batches do |group|
      group.each do |we|
        updates = we.exercise_executions.map.with_index do |ee, i|
          [ee.id, { order: i + 1 }]
        end.to_h
        ExerciseExecution.update(updates.keys, updates.values)
      end
    end

    change_column_null :exercise_executions, :order, :false
  end

  def down
    remove_column :exercise_executions, :order
  end
end
