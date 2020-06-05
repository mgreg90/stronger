# Transform JSON request param keys from JSON-conventional camelCase to
# Rails-conventional snake_case:
ActionDispatch::Request.parameter_parsers[:json] = -> (raw_post) {
  # Modified from action_dispatch/http/parameters.rb
  data = ActiveSupport::JSON.decode(raw_post)
  return {'_collection' => data}.deep_transform_keys!(&:underscore) if !data.is_a?(Hash)

  # Transform camelCase param keys to snake_case:
  data.deep_transform_keys!(&:underscore)
}

# Taken form rails source code for hash. This is needed to convert params from
# multipart form requests to snake case. See ApiController for where it's
# being used.
class ActionController::Parameters
  def deep_transform_keys!(&block)
    keys.each do |key|
      value = delete(key)
      self[yield(key)] = if value.is_a?(ActionController::Parameters) || value.is_a?(Hash)
        value.deep_transform_keys!(&block)
      else
        value
      end
    end
    self
  end
end
