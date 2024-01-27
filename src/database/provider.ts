import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { isEmail, isMobilePhone } from "validator";

const provider = new Schema({
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
  availabilities: {
    type: String, // Will replace with object from Availability model
    required: true,
  },
});

provider.plugin(uniqueValidator);

const providers = mongoose.model("providers", provider);

export { providers };
