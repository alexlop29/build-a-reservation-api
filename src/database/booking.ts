import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose";

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

export { booking, bookingSchema };
