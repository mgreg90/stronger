class AuthenticatedApiController < ApiController
  AuthenticationError = Class.new(StandardError)

  attr_reader :current_user

  before_action :authenticate_request!

  rescue_from AuthenticationError, with: :render_auth_error

  private

  def authenticate_request!
    command = AuthorizeRequest.(request.headers)
    if !command.success?
      raise AuthenticationError, "Authentication Failed!"
    end
    @current_user = command.result
  end

  def render_auth_error exception
    log_error(exception)
    body = build_generic_error(ErrorCodes::AUTHENTICATION_ERROR, exception)
    render json: body, status: :unauthorized
  end
end
