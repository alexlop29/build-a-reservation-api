import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose";

/*
NOTE: (ALopez) Reminder to:
- Replace the clientId, providerId type to ObjectID
- Add validation to confirm status is one of the following
"BOOKED", "CONFIRMED", "COMPLETED", "CANCELED", "NO SHOW"
- May want to consider background jobs to clean up canceled appointments
*/
const bookingSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: "providers",
    required: true,
  },
  startsAt: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
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

const booking = mongoose.model("bookings", bookingSchema);

export { booking };
