namespace :exercise_types do
  desc "Seed all exercise types from db/data/exercise_types.yaml"
  task seed: :environment do
    file_path = Rails.root.join('db', 'data', 'exercise_types.yaml')
    exercise_types = YAML.load_file(file_path)

    count = ExerciseType.count
    puts "# Exercise Types Before: #{count}"

    exercise_types.each do |exercise_type|
      ExerciseType.create(exercise_type)
    end

    count = ExerciseType.count
    puts "# Exercise Types After: #{count}"
  end
end
