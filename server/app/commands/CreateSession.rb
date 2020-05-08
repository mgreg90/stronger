class CreateSession
  prepend SimpleCommand

  ERROR_MESSAGE = "Email and/or password incorrect"

  def initialize(email:, password:)
    @email = email
    @password = password
  end

  def call
    if !user&.authenticate(password)
      errors.add(:email, ERROR_MESSAGE)
      errors.add(:password, ERROR_MESSAGE)
      return
    end

    {
      message: "Success",
      token: CreateToken.call(user).result
    }
  end

  private

  attr_reader :email, :password

  def user
    @user ||= User.find_by(email: email)
  end

end
