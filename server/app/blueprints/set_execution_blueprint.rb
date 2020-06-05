class SetExecutionBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :reps, :weight, :status
  end
end
