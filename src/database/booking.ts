import { Schema } from "mongoose";

/*
NOTE: (ALopez) Reminder to:
- Replace the clientId type to ObjectID
- Add validation to the booking class to confirm startAt and endAt
are exactly fifteen minutes apart.
- Add validation to confirm status is one of the following
"BOOKED", "CONFIRMED", "COMPLETED", "CANCELED", "NO SHOW"
- May want to consider background jobs to clean up canceled appointments
*/
const bookingSchema = new Schema({
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
  endAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export { bookingSchema };
