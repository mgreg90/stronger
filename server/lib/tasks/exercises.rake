namespace :exercises do
  desc "Seed all exercises from db/data/exercises.yaml"
  task seed: :environment do
    file_path = Rails.root.join('db', 'data', 'exercises.yaml')
    exercises = YAML.load_file(file_path)

    count = Exercise.count
    puts "# Exercises Before: #{count}"

    exercises.each do |ex_props|
      type_codes = ex_props.slice(:exercise_type_codes)
      ex = Exercise.new(ex_props)
      ex.exercise_type_codes = type_codes[:exercise_type_codes] || []
      ex.convert_codes_to_ids!
      ex.save
    end

    count = Exercise.count
    puts "# Exercises After: #{count}"

  end
end
