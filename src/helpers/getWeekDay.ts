const moment = require("moment");

const daysIntToString: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const getWeekDay = (date: Date): String => {
  let num = Number(moment(date).isoWeekday());
  return daysIntToString[num];
};

export { getWeekDay };
