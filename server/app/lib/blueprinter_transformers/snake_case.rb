module BlueprinterTransformers
  class SnakeCase < Blueprinter::Transformer
    def transform(hash, object, options)
      hash.deep_transform_keys! { |k| k.to_s.camelcase(:lower) }
    end
  end
end
