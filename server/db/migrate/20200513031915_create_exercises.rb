class CreateExercises < ActiveRecord::Migration[6.0]
  def change
    execute "create extension pg_trgm;"
    create_table :exercises do |t|
      t.string :name
      t.references :exercise_types

      t.timestamps
    end
  end
end
