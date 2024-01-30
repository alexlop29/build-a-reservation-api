import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose.js";
const uniqueValidator = require("mongoose-unique-validator");
import pkg from 'validator';
const { isEmail, isMobilePhone } = pkg;
import { availability } from "./availability.js";

/*
- May want additional input validation on the time ranges
*/
const providerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid Email Address"],
  },
  phone: {
    type: String,
    required: true,
    validate: [isMobilePhone, "Invalid Phone Number"],
  },
  availabilities: [availability],
});

providerSchema.plugin(uniqueValidator);

const provider = mongoose.model("providers", providerSchema);

export { provider };
