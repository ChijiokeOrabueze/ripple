import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToDb } from "./db";
import { routes } from "./routes";
const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ripple API running!");
});

app.use("/api/v1", routes());

const initApp = async () => {
  const isConnected = await connectToDb();
  if (!isConnected) return;
  app.listen(port, () => {
    return console.log(`App started on port ${port}`);
  });
};

initApp();
