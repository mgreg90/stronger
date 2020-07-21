class Api::V1::WorkoutExecutions::RepeatController < AuthenticatedApiController
  def create
    workout_execution = WorkoutExecution.with_sets.find(params[:workout_execution_id])
    new_workout_execution = workout_execution.create_repeat

    render json: new_workout_execution, status: :created
  end
end
