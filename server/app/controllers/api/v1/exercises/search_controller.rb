class Api::V1::Exercises::SearchController < ApiController
  def create
    results = Exercise.search_by_name(params[:query])
    render json: results, status: :ok
  end
end
