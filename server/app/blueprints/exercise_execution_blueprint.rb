class ExerciseExecutionBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :order, :created_at, :updated_at
    association :set_executions, blueprint: SetExecutionBlueprint, view: :normal
    association :exercise, blueprint: ExerciseBlueprint, view: :normal
  end
end
