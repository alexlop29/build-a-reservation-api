import { Schema } from "mongoose";

/*
NOTE: (ALoprz) Can check if booking falls
into the availability of the provider
https://www.geeksforgeeks.org/moment-js-isbetween-function/
*/
const availability = new Schema({
  weekDay: {
    type: String,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

export { availability };
