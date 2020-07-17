class ExerciseTypeBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :name, :code
  end
end
