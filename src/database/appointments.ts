import { mongoose } from "../config/mongoose";
import { Schema } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { appointment } from "./index.js";

const appointmentsSchema = new Schema({
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  appointments: [appointment],
});

appointmentsSchema.plugin(uniqueValidator);

const appointments = mongoose.model("appointments", appointmentsSchema);

export { appointments };
