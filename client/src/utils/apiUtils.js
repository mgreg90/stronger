import toasts from './toasts';

const requestSuccessful = (resp) =>
  resp && resp.status >= 200 && resp.status < 300;

const handleErrors = (model, response) => {
  if ((response?.body?.errors || []).find((err) => err.field)) {
    response.body.errors.forEach((err) => {
      model.$set(model, `${err.field}Error`, err.message);
    });
  } else {
    const unhandledError = {
      message: 'Unhandled Server Error!',
      status: response.status,
    };

    console.error('ERROR!', response.body?.errors || unhandledError);
    toasts.error(response.body.errors?.[0]?.message || 'Something Went Wrong!');
  }
};

const apiUtils = {
  requestSuccessful,
  handleErrors,
};

export default apiUtils;
