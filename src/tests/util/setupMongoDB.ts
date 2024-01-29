import { mongoose } from "../../config/mongoose";

const initialize = async () => {
  await mongoose.connection.dropCollection("providers");
};

export { initialize };
