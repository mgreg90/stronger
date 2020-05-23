namespace :data do
  desc "Call All Seed Rakes"
  task seed: :environment do
    Rake::Task['exercise_types:seed'].invoke
    Rake::Task['exercises:seed'].invoke
  end
end
