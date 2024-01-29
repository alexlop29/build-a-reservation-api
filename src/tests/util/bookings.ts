const moment = require("moment");

const sampleBooking = {
  _id: "23123123124133",
  clientId: "231231231231",
  providerId: "31231231231231231",
  startsAt: moment().add(48, "hours"),
  duration: 15,
  updatedAt: moment(),
  status: "BOOKED",
};

const existingBooking = {
  _id: "09080989798797923213",
  clientId: "",
  providerId: "",
  startsAt: moment().add(48, "hours"),
  duration: 15,
  updatedAt: moment(),
  status: "BOOKED",
};

export { sampleBooking, existingBooking };
