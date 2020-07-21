class SetExecution < ApplicationRecord
  belongs_to :exercise_execution
  enum status: { pending: 0, skipped: 1, completed: 2, failed: 3 }

  before_create :generate_order
  before_save :set_finished_at

  def build_repeat
    repeat = self.dup
    repeat.reset
    repeat
  end

  def reset
    %i(created_at updated_at finished_at exercise_execution_id).each do |field|
      send("#{field}=", nil)
    end
    self.status = :pending
  end

  private

  def generate_order
    return if order

    self.order = exercise_execution.set_executions.count + 1
  end

  def set_finished_at
    return if finished_at || !completed?
    self.finished_at = DateTime.now
  end
end
