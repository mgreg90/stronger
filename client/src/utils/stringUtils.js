const ellipsis = (str, len) => {
  if (str.length <= len) return str;
  const shortenedStr = str.slice(0, len - 3);
  return `${shortenedStr}...`;
};

const pathStart = (str) => {
  const path = str.startsWith('/') ? str.replace('/', '') : str;
  return path.split('/')[0];
};

const stringUtils = {
  ellipsis,
  pathStart,
};

export default stringUtils;
