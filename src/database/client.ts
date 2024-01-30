import { Schema } from "mongoose";
import { mongoose } from "../config/mongoose.js";
const uniqueValidator = require("mongoose-unique-validator");
import pkg from 'validator';
const { isEmail, isMobilePhone } = pkg;

const clientSchema = new Schema({
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
});

clientSchema.plugin(uniqueValidator);

const client = mongoose.model("clients", clientSchema);

export { client };
