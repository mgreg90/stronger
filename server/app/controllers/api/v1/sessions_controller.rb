class Api::V1::SessionsController < ApiController
  def create
    command = CreateSession.call(**create_params)

    if command.success?
      render json: command.result, status: :created
    else
      # todo change to use ant project-esque error handling
      render json: { error: 'Error!' }, status: :unprocessable_entity
    end
  end

  private

  def create_params
    params.permit(:email, :password).to_h.symbolize_keys
  end
end
