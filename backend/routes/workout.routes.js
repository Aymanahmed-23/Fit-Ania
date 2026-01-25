import { Router } from "express";
import { generateWorkout } from "../controller/workout.controller.js";
import { getWorkoutHistory } from "../controller/workoutHistory.controller.js";
import { getWorkoutStats } from "../controller/workoutStats.controller.js";

const workoutRouter = Router();

workoutRouter.post("/generate", generateWorkout);
workoutRouter.get("/history", getWorkoutHistory);
workoutRouter.get("/stats", getWorkoutStats);

export default workoutRouter;
