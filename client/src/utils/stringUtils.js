const ellipsis = (str, len) => {
  if (str.length <= len) return str;
  const shortenedStr = str.slice(0, len - 3);
  return `${shortenedStr}...`;
};

const stringUtils = {
  ellipsis,
};

export default stringUtils;
