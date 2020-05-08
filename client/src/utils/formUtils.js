const clearErrors = (model, fields) => {
  fields.forEach((field) => {
    model.$set(model, `${field}Error`, '');
  });
};

const setErrors = (model, errors) => {
  errors.forEach((err) => {
    console.error(err.field, err.message);
    model.$set(model, `${err.field}Error`, err.message);
  });
};

const formUtils = {
  clearErrors,
  setErrors,
};

export default formUtils;
