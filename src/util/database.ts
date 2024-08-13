import mongoose from "mongoose";
import "dotenv/config";
const connectDb = async () => {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url!);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1); //Indicates an exit due to an error or an unsuccessful termination
  }
};
export { connectDb };
