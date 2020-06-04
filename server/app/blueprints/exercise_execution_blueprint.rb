class ExerciseExecutionBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :created_at, :updated_at
    association :set_executions, blueprint: SetExecutionBlueprint, view: :normal
    association :exercise, blueprint: ExerciseBlueprint, view: :normal
  end
end
