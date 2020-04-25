class Api::V1::UsersController < ::ApiController
  def create
    user = User.create!(create_params)
    head :created
  end

  private

  def create_params
    byebug
    params.permit(:email, :password, :password_confirmation)
  end
end
