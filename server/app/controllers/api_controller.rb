class ApiController < ActionController::API
  module ErrorCodes
    VALIDATION_ERROR = 'VALIDATION_ERROR'
    NOT_FOUND_ERROR = 'NOT_FOUND_ERROR'
  end

  before_action :snake_case_params!

  rescue_from ActiveRecord::RecordInvalid, with: :render_validation_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error

  private

  def render_validation_error exception
    body = build_generic_error(ErrorCodes::VALIDATION_ERROR, exception)
    render json: body, status: :unprocessable_entity
  end

  def render_not_found_error exception
    body = build_generic_error(ErrorCodes::NOT_FOUND_ERROR, exception)
    render json: body, status: :not_found
  end

  def build_generic_error(code, exception)
    {
      error: {
        code: code,
        messages: exception.record.errors.full_messages
      }
    }
  end

  def snake_case_params!
    params.deep_transform_keys!(&:underscore) if multipart? || query_params?
  end

  def multipart?
    !!(/^multipart\/form-data*/ =~ request.headers['content-type'])
  end

  def query_params?
    request.headers['QUERY_STRING'].present?
  end
end
