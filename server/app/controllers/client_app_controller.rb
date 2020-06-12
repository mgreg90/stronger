class ClientAppController < ApplicationController
  protect_from_forgery except: :index

  def index
    if requesting_public_asset?
      render file: "public#{request.path}"
    else
      render file: 'public/index.html'
    end
  end

  private

  def requesting_public_asset?
    %w(/css/ /js/ /favicon.ico).any? { |test| request.path.start_with?(test) }
  end
end
