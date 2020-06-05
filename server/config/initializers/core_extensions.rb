boolean_classes = [TrueClass, FalseClass, NilClass]
boolean_classes.each do |klass|
  klass.include CoreExtensions::BoolClass::ToBool
end

String.include CoreExtensions::String::ToBool
