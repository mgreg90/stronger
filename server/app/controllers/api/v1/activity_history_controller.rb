class Api::V1::ActivityHistoryController < AuthenticatedApiController
  def show
    ahist = CreateHistory.(user: current_user).result

    render json: ahist, status: :ok
  end
end
