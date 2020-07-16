class Api::V1::CurrentWorkoutController < AuthenticatedApiController
  def show
    workout_execution = current_user.workout_executions.active.default_order.last!

    render json: workout_execution, status: :ok
  end
end
