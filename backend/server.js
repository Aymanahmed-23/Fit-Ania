import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import workoutRouter from "./routes/workout.routes.js";
import cors from "cors";
import db from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/workouts", workoutRouter);
app.use("/api/auth", authRouter);

console.log("API_NINJAS_KEY:", process.env.API_NINJAS_KEY);

app.post("/__force-insert", (req, res) => {
  db.run(
    `INSERT INTO workouts (user_id, muscle, difficulty)
     VALUES (999, 'force_test', 'test')`,
    function (err) {
      if (err) {
        console.error("❌ FORCE INSERT FAILED:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("✅ FORCE INSERT ID:", this.lastID);
      res.json({ ok: true, id: this.lastID });
    }
  );
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
