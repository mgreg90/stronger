class SetExecutionBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :reps, :weight, :status, :order, :finished_at
  end
end
