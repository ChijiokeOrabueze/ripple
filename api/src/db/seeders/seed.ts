import mongoose from "mongoose";
import dotenv from "dotenv";
import { Trigger } from "../models/trigger.model";
import { triggerSeeds } from "./trigger.seeders";
dotenv.config();

const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl)
  .then(async () => {
    await Trigger.deleteMany();
    await Trigger.insertMany(triggerSeeds);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
