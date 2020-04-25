class Api::V1::UsersController < ApplicationController
  def create
    user = User.create!(create_params)
    head :created
  end

  private

  def create_params
    params.permit(:email, :password, :password_confirmation)
  end
end
