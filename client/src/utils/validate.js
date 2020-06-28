// #validate
// PARAMS:
// model - data object of a vue component
// options - object of fields, with nested rules, ex:
// {
//   email: {
//     required: true,
//     minLength: 6,
//     maxLength: 40,
//   },
//   password: {
//     required: true,
//     minLength: 6,
//     maxLength: 40,
//   },
//   passwordConfirmation: {
//     required: true,
//     matchField: 'passwordConfirmation',
//   },
// }
//
// RETURN VALUE
// array of error objects, ex:
// [
//   {
//     field: 'email',
//     message: 'email is required'
//   }, {
//     field: 'password',
//     message: 'password must have at least 6 characters'
//   }
// ]

const validateRequired = (field, ruleValue, value) => {
  if (ruleValue && !value) {
    return { field, message: 'Field cannot be blank' };
  }
  return null;
};

const validateMinLength = (field, ruleValue, value) => {
  if (!value || value.length < ruleValue) {
    return { field, message: `Field cannot be less than ${ruleValue} characters` };
  }
  return null;
};

const validateMaxLength = (field, ruleValue, value) => {
  if (value && value.length > ruleValue) {
    return { field, message: `Field cannot be more than ${ruleValue} characters` };
  }
  return null;
};

const validateMatchField = (field1, field2, model) => {
  const value1 = model[field1];
  const value2 = model[field2];
  if (value1 !== value2) {
    return { field: field1, message: `Field must match ${field2}` };
  }
  return null;
};

export const validateField = (model, field, rules) => {
  const value = model[field];
  const ruleKeys = Object.keys(rules);


  for (let x = 0; x < ruleKeys.length; x++) {
    const rule = ruleKeys[x];
    const ruleValue = rules[rule];
    let error;

    switch (rule) {
      case 'required':
        error = validateRequired(field, ruleValue, value);
        if (error) return error;
        break;

      case 'minLength':
        error = validateMinLength(field, ruleValue, value);
        if (error) return error;
        break;

      case 'maxLength':
        error = validateMaxLength(field, ruleValue, value);
        if (error) return error;
        break;

      case 'matchField':
        error = validateMatchField(field, ruleValue, model);
        if (error) return error;
        break;

      default:
        throw new Error(`Invalid Validation Rule: ${rule}`);
    }
  }
  return null;
};

const validate = (model, allRules) => {
  const errors = [];
  Object.entries(allRules).forEach(([field, rules]) => {
    const error = validateField(model, field, rules);
    if (error) errors.push(error);
  });
  return errors;
};

export default validate;
