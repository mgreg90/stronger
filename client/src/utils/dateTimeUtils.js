import { stringUtils } from '@/utils';

const formattedDateFromString = (strDateTime) => {
  const date = new Date(strDateTime);
  return date.toLocaleDateString();
};

const msToTime = (seconds) => {
  const { leftPad } = stringUtils;
  let s = seconds;
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return `${leftPad(hrs, 2, 0)}:${leftPad(mins, 2, 0)}:${leftPad(secs, 2, 0)}`;
};

const dateTimeUtils = {
  formattedDateFromString,
  msToTime,
};

export default dateTimeUtils;
