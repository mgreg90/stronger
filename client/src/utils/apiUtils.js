import toasts from './toasts';

const requestSuccessful = (resp) =>
  resp && resp.status >= 200 && resp.status < 300;

const handleErrors = (model, response) => {
  if ((response?.body?.errors || []).find((err) => err.field)) {
    response.body.errors.forEach((err) => {
      model.$set(model, `${err.field}Error`, err.message);
    });
  } else {
    console.error('ERROR!', response.body.errors);
    toasts.error(response.body.errors[0].message);
  }
};

const apiUtils = {
  requestSuccessful,
  handleErrors,
};

export default apiUtils;
