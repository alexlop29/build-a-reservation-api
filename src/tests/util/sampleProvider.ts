const moment = require("moment");

const sampleProvider = {
  firstName: "John",
  lastName: "Tucker",
  email: "jtucker@gmail.com",
  phone: "9127772389",
  availabilties: [
    {
      weekDay: "Sunday",
      startAt: moment().day("Sunday").hour(9).minute(0).second(0),
      endAt: moment().day("Sunday").hour(17).minute(0).second(0),
    },
    {
      weekDay: "Monday",
      startAt: moment().day("Monday").hour(9).minute(0).second(0),
      endAt: moment().day("Monday").hour(17).minute(0).second(0),
    },
    {
      weekDay: "Friday",
      startAt: moment().day("Monday").hour(9).minute(0).second(0),
      endAt: moment().day("Monday").hour(17).minute(0).second(0),
    },
  ],
};

export { sampleProvider };
