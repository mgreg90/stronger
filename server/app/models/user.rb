class User < ApplicationRecord
  has_secure_password

  has_many :workout_executions
  has_many :exercise_executions

  validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { within: 6..40 }

  before_save :normalize_email

  private

  def normalize_email
    self.email = email.strip.downcase
  end

end
