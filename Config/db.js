import mongoose from "mongoose";
import { config } from "dotenv";
config();
const db = process.env.MONGODB_URI;
async function connectdb() {
  try {
    await mongoose.connect(db, {
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error occurred: " + err);
  }
}

export default connectdb;
