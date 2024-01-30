import { Queue, Worker } from "bullmq";
import { REDIS_HOST, REDIS_PORT } from "../config/environment";
import { booking } from "../database/index";

const moment = require("moment");

export const redisOptions = { host: REDIS_HOST, port: REDIS_PORT };

const Bookings = new Queue("Bookings", { connection: redisOptions });

async function addJob(job: any) {
  const options = { repeat: { pattern: "* * * * *" } };
  await Bookings.add(job.name, job, options);
}

async function expireBookings() {
  await booking.updateMany(
    {
      status: "BOOKED",
      updatedAt: {
        $lte: moment().subtract(30, "minutes").toDate(),
      },
    },
    {
      $set: { status: "CANCELED" },
    },
  );
}

const processJob = async (job: any) => {
  const jobHandlers = {
    expireBookings: expireBookings,
  };

  const handler = jobHandlers[job.name as keyof typeof jobHandlers];

  if (handler) {
    console.log(`Processing job: ${job.name}`);
    await handler();
  }
};

const worker = new Worker("Bookings", processJob, { connection: redisOptions });

worker.on("completed", (job) => {
  console.log(`${job} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job} has failed with ${err.message}`);
});

console.log("Worker started!");

export { addJob, expireBookings, Bookings };
