import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose";

/*
NOTE: (ALopez) Reminder to:
- Replace the clientId, providerId type to ObjectID
- Add validation to confirm status is one of the following
"BOOKED", "CONFIRMED", "COMPLETED", "CANCELED", "NO SHOW"
- May want to consider background jobs to clean up canceled appointments
*/
const booking = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const bookings = mongoose.model("bookings", booking);

export { bookings };
