class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { within: 6..40 }
end
