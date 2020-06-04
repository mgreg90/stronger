module ModelExtensions
  module IncludeAssociationsInJson
    def as_json options = {}
      associations = self.class.reflect_on_all_associations.map(&:name)
      associations.each do |assoc|
        if association_cached? assoc
          options.merge!(include: assoc)
        end
      end
      super(options)
    end
  end
end
