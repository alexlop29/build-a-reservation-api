import { Schema } from "mongoose";

/*
NOTE: (alopez) Use `validator` to improve input
validation of the following schema.
*/
const availability = new Schema({
  weekDay: {
    type: String,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: String,
    required: true,
  },
});

export { availability };
