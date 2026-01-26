console.log("WORKOUT ROUTES FILE LOADED");

import { Router } from "express";
import { generateWorkout } from "../controller/workout.controller.js";
import { getWorkoutHistory } from "../controller/workoutHistory.controller.js";
import { getWorkoutStats } from "../controller/workoutStats.controller.js";
import { authenticateToken} from '../midleware/auth.middleware.js';

const workoutRouter = Router();

workoutRouter.post("/generate", generateWorkout);
workoutRouter.get("/history", authenticateToken, getWorkoutHistory);
workoutRouter.get("/stats", authenticateToken, getWorkoutStats);

export default workoutRouter;
