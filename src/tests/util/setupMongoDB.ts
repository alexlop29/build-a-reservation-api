import { mongoose } from "../../config/mongoose";
import { provider, client, booking } from "../../database";
import { existingProvider, existingClient, existingBooking } from "./";

let validClientId: string;
let validProviderId: string;

const initialize = async () => {
  await mongoose.connection.dropCollection("providers");
  await mongoose.connection.dropCollection("clients");
  await mongoose.connection.dropCollection("bookings");
  const newProvider = new provider({
    firstName: existingProvider.firstName,
    lastName: existingProvider.lastName,
    email: existingProvider.email,
    phone: existingProvider.phone,
    availabilities: existingProvider.availabilties,
  });
  await newProvider.save();
  validProviderId = existingBooking.providerId = newProvider._id;
  const newClient = new client({
    firstName: existingClient.firstName,
    lastName: existingClient.lastName,
    email: existingClient.email,
    phone: existingClient.phone,
  });
  await newClient.save();
  validClientId = existingBooking.clientId = newClient._id;
  const newBooking = new booking({
    clientId: existingBooking.clientId,
    providerId: existingBooking.providerId,
    startsAt: existingBooking.startsAt,
    duration: 15,
    updatedAt: existingBooking.updatedAt,
    status: existingBooking.status,
  });
  await newBooking.save();
};

export { initialize, validClientId, validProviderId };
