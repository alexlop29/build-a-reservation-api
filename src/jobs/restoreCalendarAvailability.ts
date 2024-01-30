import { Queue } from "bullmq";
import { REDIS_HOST, REDIS_PORT } from "../config/environment";
import { booking } from "../database/index";

const moment = require("moment");

export const redisOptions = { host: REDIS_HOST, port: REDIS_PORT };

const Bookings = new Queue("Bookings", { connection: redisOptions });

/*
Double check! Do not use any.
*/
async function addJob(job: any) {
  const options = { repeat: { pattern: "* * * * *" } };
  await Bookings.add(job.name, job, options);
}

export const freeUnconfirmedAppointments = () => {
  booking.updateMany(
    {
      status: "BOOKED",
      updatedAt: { $gte: moment().subtract(30, "minutes").toDate().getTime() },
    },
    {
      $set: { status: "CANCELED" },
    },
  );
};

export { addJob };

// await addJob({ name: "freeUnconfirmedAppointments" });
