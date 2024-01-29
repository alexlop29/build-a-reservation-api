import { Schema } from "mongoose";

/*
Improve validation of startAt and endAt
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
