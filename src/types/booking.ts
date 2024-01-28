import { Schema } from "mongoose";

type Booking = {
  _id: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  providerId: Schema.Types.ObjectId;
  startsAt: Date;
  duration: Number;
  updatedAt: Date;
  status: String;
};

export { Booking };
