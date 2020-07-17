class ExerciseBlueprint < AppBlueprinterBase
  identifier :id

  view :normal do
    fields :name
    association :exercise_types, blueprint: ExerciseTypeBlueprint, view: :normal
  end
end
