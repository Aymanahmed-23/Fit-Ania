import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import workoutRouter from "./routes/workout.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/workouts", workoutRouter);
app.use("/api/auth", authRouter);

console.log("API_NINJAS_KEY:", process.env.API_NINJAS_KEY);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
