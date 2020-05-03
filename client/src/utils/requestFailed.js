const requestFailed = (resp) => !resp || resp.status >= 300 || resp.status < 200;

export default requestFailed;
