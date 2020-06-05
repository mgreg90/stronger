class SetExecution < ApplicationRecord
  belongs_to :exercise_execution
  enum status: { pending: 0, skipped: 1, successful: 2, failed: 3 }
end
