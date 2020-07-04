class AddFinishedAtToSetExecution < ActiveRecord::Migration[6.0]
  def change
    add_column :set_executions, :finished_at, :datetime

    SetExecution.all.each do |set_exec|
      next if !set_exec.completed?
      set_exec.finished_at = set_exec.updated_at
      set_exec.save!
    end

  end
end
