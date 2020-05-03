class Api::V1::UsersController < ::ApiController
  def create
    command = CreateUser.call(**create_params)

    if command.success?
      render json: command.result, status: :created
    else
      # todo change to use ant project-esque error handling
      render json: { error: 'Error!' }, status: :unprocessable_entity
    end
      
  end

  private

  def create_params
    params.permit(:email, :password, :password_confirmation).to_h.symbolize_keys
  end
end
