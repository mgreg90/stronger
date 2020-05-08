class CreateToken
  prepend SimpleCommand

  # unit is "days"
  DEFAULT_EXPIRATION_LENGTH = 2
  LONG_EXPIRATION_LENGTH = 30

  def initialize(user, length: DEFAULT_EXPIRATION_LENGTH)
    @user = user
    @length = length
  end

  def call
    JsonWebToken.encode(
      user_id: user.id,
      email: user.email,
      exp: exp
    )
  end

  private

  attr_reader :user, :length

  def exp
    ((DateTime.now.utc + length.days).to_f * 1000).floor
  end

end