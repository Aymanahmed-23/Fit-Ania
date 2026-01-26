console.log("SERVER ENTRY FILE LOADED");

import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import workoutRouter from "./routes/workout.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
   origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/workouts", workoutRouter);
app.use("/api/auth", authRouter);
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

