module NonDbModels
  class PreviousExerciseExecutionSummary
    attr_reader :exercise, :user

    def initialize user:, exercise:
      @user = user
      @exercise = exercise
    end

    def as_json **args
      return if !last_exercise_execution
      {
        exerciseId: exercise.id,
        minWeight: min_weight,
        maxWeight: max_weight,
        numSets: num_sets,
        maxReps: max_reps,
        minReps: min_reps,
        date: date
      }
    end

    private

    def min_weight
      set = last_exercise_execution.set_executions.min do |set1, set2|
        set1.weight <=> set2.weight
      end
      set.weight
    end

    def max_weight
      set = last_exercise_execution.set_executions.max do |set1, set2|
        set1.weight <=> set2.weight
      end
      set.weight
    end

    def num_sets
      last_exercise_execution.set_executions.count
    end

    def max_reps
      set = last_exercise_execution.set_executions.max do |set1, set2|
        set1.reps <=> set2.reps
      end
      set.reps
    end

    def min_reps
      set = last_exercise_execution.set_executions.min do |set1, set2|
        set1.reps <=> set2.reps
      end
      set.reps
    end

    def date
      last_exercise_execution.set_executions.first.created_at
    end

    def last_exercise_execution
      @last_exercise_execution ||= begin
        inner_join = 'INNER JOIN set_executions ON set_executions.exercise_execution_id = exercise_executions.id'
        where = 'exercise_executions.user_id = ? AND set_executions.finished_at IS NOT NULL AND workout_executions.finished_at IS NOT NULL'
        order = 'set_executions.finished_at desc'

        exercise.
          exercise_executions.
          joins(inner_join).
          joins(:workout_execution).
          where(where, user.id).
          order(order).
          first
      end
    end
  end
end
