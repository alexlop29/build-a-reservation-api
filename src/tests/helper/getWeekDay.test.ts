import { getWeekDay } from "../../helpers/";
const moment = require("moment");

test("Should return the day of the week", () => {
  let day = moment("2024-01-28");
  expect(getWeekDay(day)).toBe("Sunday");
});
