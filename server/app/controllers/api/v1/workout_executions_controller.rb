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
end
