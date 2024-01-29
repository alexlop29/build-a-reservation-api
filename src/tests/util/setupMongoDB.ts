import { mongoose } from "../../config/mongoose";
import { provider, client, booking } from "../../database";
import { existingProvider, existingClient, existingBooking } from "./index";

const initialize = async () => {
  await mongoose.connection.dropCollection("providers");
  await mongoose.connection.dropCollection("clients");
  await mongoose.connection.dropCollection("bookings");
  const newProvider = new provider(existingProvider);
  await newProvider.save();
  existingBooking.providerId = newProvider._id;
  const newClient = new client(existingClient);
  await newClient.save();
  existingBooking.clientId = newClient._id;
  const newBooking = new booking(existingBooking);
  await newBooking.save();
};

export { initialize };
