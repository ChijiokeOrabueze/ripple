import mongoose from "mongoose";

export const connectToDb = async () => {
  console.log("Checking database connection...");
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) throw new Error("Db url not set");
    await mongoose.connect(dbUrl);
    console.log("Db connection successful");
    return true;
  } catch (err) {
    console.error("Db connection failed");
    console.error(err);
    return false;
  }
};
