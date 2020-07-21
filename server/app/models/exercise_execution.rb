class ExerciseExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson

  belongs_to :exercise
  belongs_to :user
  belongs_to :workout_execution

  has_many :set_executions, dependent: :destroy

  def build_repeat
    repeat = self.dup
    repeat.reset
    repeat.set_executions = self.set_executions.map(&:build_repeat)
    repeat
  end

  def reset
    %i(created_at updated_at workout_execution_id).each do |field|
      send("#{field}=", nil)
    end
  end
end
