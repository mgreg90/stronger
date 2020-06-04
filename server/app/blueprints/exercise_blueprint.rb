class ExerciseBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :name
  end
end
