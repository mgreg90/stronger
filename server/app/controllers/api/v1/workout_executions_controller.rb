class Api::V1::WorkoutExecutionsController < AuthenticatedApiController
  def create
    workout = WorkoutExecution.create!(user: current_user)

    render json: workout, status: :created
  end
  
  def show
    workout = WorkoutExecution
    view = :normal

    if params[:with_set_executions].to_bool
      view = :extended
      workout = workout.includes(exercise_executions: [:exercise, :set_executions])
    end

    workout = workout.find(params[:id])

    render json: WorkoutExecutionBlueprint.render(workout, view: view), status: :ok
  end

  def update
    workout_execution = WorkoutExecution.find(params[:id])
    workout_execution.update!(update_params)

    render json: workout_execution, status: :ok
  end

  private

  def update_params
    params.permit(:started_at, :finished_at)
  end
end
