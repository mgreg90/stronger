class CreateSetExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :set_executions do |t|
      t.integer :reps, null: false
      t.integer :weight, null: false
      t.integer :status, null: false
      t.references :exercise_execution, null: false, foreign_key: true

      t.timestamps
    end
  end
end
