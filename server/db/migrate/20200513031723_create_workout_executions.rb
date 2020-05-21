class CreateWorkoutExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :workout_executions do |t|
      t.datetime :started_at
      t.datetime :finished_at
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
