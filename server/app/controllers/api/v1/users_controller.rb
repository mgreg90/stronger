class Api::V1::UsersController < ::ApiController
  def create
    command = CreateUser.call(**create_params)

    if command.success?
      render json: command.result, status: :created
    else
      render command_error_json(command)
    end
  end

  private

  def create_params
    params.permit(:email, :password, :password_confirmation).to_h.symbolize_keys
  end
end
