class CreateUser
  prepend SimpleCommand

  def initialize(email:, password:, password_confirmation:)
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    errors.add(:signup, user.errors.first) && return if user.errors.any?
    {
      message: "Success",
      token: build_token
    }
  end

  private

  attr_reader :email, :password, :password_confirmation

  def user
    @user ||= User.create(
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )
  end

  def build_token
    exp = ((DateTime.now.utc + 1.days).to_f * 1000).floor

    JsonWebToken.encode(
      user_id: user.id,
      email: user.email,
      exp: exp
    )
  end

end