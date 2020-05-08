class Api::V1::SessionsController < ApiController
  def create
    command = CreateSession.call(**create_params)

    if command.success?
      render json: command.result, status: :created
    else
      render command_error_json(command)
    end
  end

  private

  def create_params
    params.permit(:email, :password).to_h.symbolize_keys
  end
end
