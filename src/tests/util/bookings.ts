const moment = require("moment");

const sampleBooking = {
  clientId: "231231231231",
  providerId: "31231231231231231",
  startsAt: moment().add(48, "hours"),
  duration: 15,
  updatedAt: moment(),
  status: "BOOKED",
};

const existingBooking = {
  clientId: "",
  providerId: "",
  startsAt: moment().add(48, "hours"),
  duration: 15,
  updatedAt: moment(),
  status: "BOOKED",
};

export { sampleBooking, existingBooking };
