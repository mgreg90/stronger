class CreateRails < ActiveRecord::Migration[6.0]
  def change
    create_table :rails do |t|
      t.string :d
      t.string :model
      t.string :set_execution

      t.timestamps
    end
  end
end
