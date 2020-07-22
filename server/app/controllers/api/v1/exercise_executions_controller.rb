class Api::V1::ExerciseExecutionsController < AuthenticatedApiController
  def show
    with_exercise = params[:with_exercise].to_bool

    exercise_execution = ExerciseExecution.where(id: params[:id])
    exercise_execution = exercise_execution.includes(:exercise) if with_exercise

    render json: exercise_execution.first, status: :ok
  end

  def create
    exercise_execution = ExerciseExecution.create!(create_params.merge(user: current_user))
    render json: exercise_execution, status: :created
  end

  def update
    exercise_execution = ExerciseExecution.find(params[:id]).update(update_params)
    render json: exercise_execution, status: :ok
  end

  def destroy
    exercise_execution = ExerciseExecution.includes(:workout_execution).find(params[:id])
    workout_execution = exercise_execution.workout_execution
    exercise_execution.destroy
    workout_execution.reorder_exercise_executions
  end

  private

  def create_params
    params.permit(:workout_execution_id, :exercise_id)
  end

  def update_params
    params.permit(:order)
  end
end
