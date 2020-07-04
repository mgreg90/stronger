const compact = (arr) => arr.filter((x) => x && ![null, undefined].includes(x));

const last = (arr) => Array.isArray(arr) && arr[arr.length - 1];

const arrayUtils = {
  compact,
  last,
};

export default arrayUtils;
