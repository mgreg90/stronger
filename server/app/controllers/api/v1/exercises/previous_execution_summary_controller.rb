class Api::V1::Exercises::PreviousExecutionSummaryController < AuthenticatedApiController
  def show
    exercise = Exercise.find(params[:exercise_id])
    summary = exercise.to_previous_execution_summary(current_user)

    if summary
      render json: summary, status: :ok
    else
      head :not_found
    end
  end
end
