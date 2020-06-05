class WorkoutExecutionBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :started_at, :finished_at, :user_id, :created_at, :updated_at
  end

  view :extended do
    include_view :normal
    association :exercise_executions, blueprint: ExerciseExecutionBlueprint, view: :normal
  end
end
