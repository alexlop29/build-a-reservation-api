const moment = require("moment");

/*
Need to adjust moment usage across files
Just want 
*/
const sampleProvider = {
  firstName: "John",
  lastName: "Tucker",
  email: "jtucker@gmail.com",
  phone: "9127772389",
  availabilties: [
    {
      weekDay: "Sunday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
    {
      weekDay: "Monday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
    {
      weekDay: "Friday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
  ],
};

const existingProvider = {
  firstName: "Steph",
  lastName: "Curry",
  email: "scurry@gmail.com",
  phone: "9123123678",
  availabilties: [
    {
      weekDay: "Monday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
    {
      weekDay: "Tuesday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
    {
      weekDay: "Friday",
      startAt: moment().hour(9).minute(0).format("HH:mm"),
      endAt: moment().hour(17).minute(0).format("HH:mm"),
    },
  ],
};

export { sampleProvider, existingProvider };
