class Api::V1::ActivityHistoryController < AuthenticatedApiController
  def show
    hist = CreateHistory.(user: current_user).result
    result = WorkoutExecutionBlueprint.render(hist, view: :extended)

    render json: result, status: :ok
  end
end
