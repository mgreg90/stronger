class Exercise < ApplicationRecord
  include PgSearch::Model

  attr_accessor :exercise_type_codes

  has_many :exercise_executions
  has_many :exercise_exercise_types
  has_many :exercise_types, through: :exercise_exercise_types

  validates :name, uniqueness: true

  pg_search_scope :search_by_name, against: :name,
    using: {
      tsearch: { dictionary: 'english' },
      trigram: { threshold: 0.2 }
    }

  def self.search query
  end

  def convert_codes_to_ids!
    memo = {}

    ex_types = exercise_type_codes.map do |ex_type_code|
      memo[ex_type_code] ||= ExerciseType.find_by(code: ex_type_code)
    end
    self.exercise_types = ex_types
  end
end
