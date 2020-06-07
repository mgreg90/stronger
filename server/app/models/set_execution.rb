class SetExecution < ApplicationRecord
  belongs_to :exercise_execution
  enum status: { pending: 0, skipped: 1, completed: 2, failed: 3 }

  before_create :generate_order

  private

  def generate_order
    return if order

    self.order = exercise_execution.set_executions.count + 1
  end
end
