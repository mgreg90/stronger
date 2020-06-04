class SetExecutionBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :reps, :weight, :status
  end
end
