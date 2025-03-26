import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
