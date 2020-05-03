const requestSuccessfull = (resp) =>
  resp && resp.status >= 200 && resp.status < 300;

export default requestSuccessfull;
