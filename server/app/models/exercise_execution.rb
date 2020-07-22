class ExerciseExecution < ApplicationRecord
  include ModelExtensions::IncludeAssociationsInJson

  belongs_to :exercise
  belongs_to :user
  belongs_to :workout_execution

  has_many :set_executions, dependent: :destroy

  before_create :generate_order

  default_scope -> { default_order }

  scope :default_order, -> { order :order }

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

  private

  def generate_order
    return if order

    self.order = workout_execution.exercise_executions.count + 1
  end
end
