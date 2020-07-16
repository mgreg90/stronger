class ApiController < ActionController::API
  module ErrorCodes
    VALIDATION_ERROR = 'VALIDATION_ERROR'
    NOT_FOUND_ERROR = 'NOT_FOUND_ERROR'
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
  end

  ERROR_MAP = {
    ActiveRecord::RecordInvalid => :render_validation_error,
    ActiveRecord::RecordNotFound => :render_not_found_error,
  }
  DEFAULT_ERROR_HANDLER = :render_internal_server_error

  before_action :snake_case_params!

  # rescue_from ActiveRecord::RecordInvalid, with: :render_validation_error
  # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
  # rescue_from StandardError, with: :render_internal_server_error
  rescue_from StandardError, with: :handle_errors

  def command_error_json command, status: :unprocessable_entity
    errors = command.errors.map do |err, msgs|
      {
        code: ErrorCodes::VALIDATION_ERROR,
        field: err,
        message: msgs
      }
    end

    {
      json: {
        errors: errors
      },
      status: status
    }
  end

  private

  def handle_errors exception
    handler = ERROR_MAP[exception.class] || DEFAULT_ERROR_HANDLER
    method(handler).call(exception)
  end

  def render_validation_error exception
    log_error(exception)
    body = build_record_error(ErrorCodes::VALIDATION_ERROR, exception)
    render json: body, status: :unprocessable_entity
  end

  def render_not_found_error exception
    log_error(exception)
    body = build_generic_error(ErrorCodes::NOT_FOUND_ERROR, exception)
    render json: body, status: :not_found
  end

  def render_internal_server_error exception
    log_error(exception)
    body = build_generic_error(ErrorCodes::INTERNAL_SERVER_ERROR, exception)
    render json: body, status: :internal_server_error
  end

  def build_record_error(code, exception)
    errors = exception.record.errors.full_messages.map do |message|
      { code: code, message: message }
    end
    { errors: errors }
  end

  def build_generic_error(code, exception)
    message = Rails.env.production? ? "Something went wrong!" : exception.message
    errors = [ { code: code, message: message } ]
    { errors: errors }
  end

  def log_error e
    logger.error(e.full_message)
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

  def params
    pams = super
    return pams['_collection'] if pams.has_key?('_collection')
    pams
  end
end
