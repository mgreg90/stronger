class CreateSetExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :set_executions do |t|
      t.integer :reps
      t.integer :weight
      t.references :exercise_execution, null: false, foreign_key: true

      t.timestamps
    end
  end
end
