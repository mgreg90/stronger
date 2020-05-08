class CreateSession
  prepend SimpleCommand

  def initialize(email:, password:)
    @email = email
    @password = password
  end

  def call
    if !user&.authenticate(password)
      errors.add(:login, "Email/password invalid")
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