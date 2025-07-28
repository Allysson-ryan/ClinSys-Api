import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import connectDB from "./Config/db.js";
const errorHandler = require("./Middleware/errorHandlerMiddleware.js");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use("/", routes);

app.use(errorHandler);

export default app;
