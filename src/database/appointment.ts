import { Schema } from "mongoose";

const appointment = new Schema({
  startAt: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

export { appointment };
