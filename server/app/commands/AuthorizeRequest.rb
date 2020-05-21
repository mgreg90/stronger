class AuthorizeRequest
  prepend SimpleCommand

  MISSING_TOKEN = 'Missing Authorization Header'
  EXPIRED_TOKEN = 'Token Expired'
  USER_NOT_FOUND = 'User could not be found'

  def initialize(headers = {})
    @headers = headers
  end

  def call
    errors.add(:token, MISSING_TOKEN) && return if !decoded_auth_token
    errors.add(:token, EXPIRED_TOKEN) && return if !token_valid?
    errors.add(:token, USER_NOT_FOUND) && return if !user
    user
  end

  private

  attr_reader :headers

  def user
    return @user if @user
    return nil if !decoded_auth_token&.[](:user_id)

    @user = User.find decoded_auth_token[:user_id]
  end

  def decoded_auth_token
    @decoded_auth_token ||= http_auth_header && JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    @http_auth_header ||= headers&.[]('Authorization')&.split(' ')&.last
  end

  def token_valid?
    return false if !decoded_auth_token&.[](:exp)

    now = DateTime.now.utc.strftime('%s').to_i

    decoded_auth_token[:exp] > now
  end
end
