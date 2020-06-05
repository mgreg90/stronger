class AppBlueprinterBase < Blueprinter::Base
  transform BlueprinterTransformers::SnakeCase

  view :normal do
    transform BlueprinterTransformers::SnakeCase
  end

  view :extended do
    transform BlueprinterTransformers::SnakeCase
  end
end
