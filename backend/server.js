import express from 'express';
import authRouter from './routes/auth.routes.js';
import dotenv from "dotenv";
dotenv.config();
import workoutRouter from "./routes/workout.routes.js";




const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.use(express.json());
app.use("/api/workouts", workoutRouter);

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
