const localDateFromString = (strDateTime) => {
  const date = new Date(strDateTime);
  return date.toLocaleDateString();
};

const dateTimeUtils = {
  localDateFromString,
};

export default dateTimeUtils;
