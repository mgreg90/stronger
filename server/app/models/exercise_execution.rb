class ExerciseExecution < ApplicationRecord
  belongs_to :workout_execution
  belongs_to :exercise

  has_many :set_executions

  def as_json options = {}
    associations = self.class.reflect_on_all_associations.map(&:name)
    associations.each do |assoc|
      if association_cached? assoc
        options.merge!(include: assoc)
      end
    end
    super(options)
  end
end
