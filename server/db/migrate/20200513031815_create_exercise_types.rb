class CreateExerciseTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :exercise_types do |t|
      t.string :name
      t.string :code, null: false, index: true

      t.timestamps
    end
  end
end
