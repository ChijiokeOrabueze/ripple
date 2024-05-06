import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToDb } from "./db";
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ripple API running!");
});

const initApp = async () => {
  const isConnected = await connectToDb();
  if (!isConnected) return;
  app.listen(port, () => {
    return console.log(`App started on port ${port}`);
  });
};

initApp();
