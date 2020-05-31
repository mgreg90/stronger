class Api::V1::SetExecutionsController < ApiController
  def create
    set_executions = nil
    SetExecution.transaction do
      set_executions = SetExecution.create!(create_params)
    end
    render json: set_executions, status: :created
  end

  private

  def create_params
    Array.wrap(params).map do |param|
      param.permit :weight, :reps, :exercise_execution_id, :status
    end
  end
end
