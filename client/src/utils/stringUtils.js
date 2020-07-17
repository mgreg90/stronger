const ellipsis = (str, len) => {
  if (str.length <= len) return str;
  const shortenedStr = str.slice(0, len - 3);
  return `${shortenedStr}...`;
};

const pathStart = (str) => {
  const path = str.startsWith('/') ? str.replace('/', '') : str;
  return path.split('/')[0];
};

const leftPad = (val, targetLength, char = ' ') => {
  let str = val.toString();
  while (str.length < targetLength) {
    str = `${char}${str}`;
  }
  return str;
};

const stringUtils = {
  ellipsis,
  leftPad,
  pathStart,
};

export default stringUtils;
