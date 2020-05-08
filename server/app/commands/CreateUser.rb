class CreateUser
  prepend SimpleCommand

  def initialize(email:, password:, password_confirmation:)
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    errors.add(:email, user.error_message) && return if user.errors.any?
    {
      message: "Success",
      token: CreateToken.call(user).result
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

end