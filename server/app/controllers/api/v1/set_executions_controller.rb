class Api::V1::SetExecutionsController < AuthenticatedApiController
  def create
    set_executions = nil
    SetExecution.transaction do
      set_executions = SetExecution.create!(create_params)
    end

    render json: set_executions, status: :created
  end

  def update
    set_execution = SetExecution.find(params[:id])
    set_execution.update!(update_params)

    render json: SetExecutionBlueprint.render(set_execution, view: :normal), status: :ok
  end

  def destroy
    SetExecution.destroy(params[:id])
  end

  private

  def create_params
    Array.wrap(params).map do |param|
      param.permit :weight, :reps, :exercise_execution_id, :status
    end
  end

  def update_params
    params.permit(:status, :id, :weight, :reps)
  end
end
