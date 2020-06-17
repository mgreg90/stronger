class SetExecutionBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :reps, :weight, :status, :order
  end
end
