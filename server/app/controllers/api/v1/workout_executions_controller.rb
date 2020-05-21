class Api::V1::WorkoutExecutionsController < AuthenticatedApiController
  def create
    workout = WorkoutExecution.create!(user: current_user)
    render json: workout, status: :created
  end
  
  def show
    workout = WorkoutExecution.find(params[:id])
    render json: workout, status: :ok
  end
end
