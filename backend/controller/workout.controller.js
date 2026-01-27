import db from "../database/db.js";
import fetch from "node-fetch";

export const generateWorkout = async (req, res) => {
  try {
    console.log("==== GENERATE START ====");
console.log("BODY:", req.body);
console.log("USER:", req.user);

    const { muscle, difficulty } = req.body;

    if (!muscle || !difficulty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedMuscle = muscle.toLowerCase();
    const normalizedDifficulty = difficulty.toLowerCase();

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${normalizedMuscle}&difficulty=${normalizedDifficulty}`;

    let data = [];

    // 🔹 TRY Ninja API, but NEVER block execution
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY,
        },
      });

      if (response.ok) {
        data = await response.json();
      } else {
        console.warn("Ninja API failed, using fallback data");
      }
    } catch (err) {
      console.warn("Ninja API error, using fallback data");
    }

    // 🔹 Fallback exercises if API is down or empty
    if (!data.length) {
      data = [
        {
          name: "Push Ups",
          equipment: "Bodyweight",
          instructions: "Keep your core tight and lower in a controlled manner.",
        },
        {
          name: "Squats",
          equipment: "Bodyweight",
          instructions: "Keep chest up and push through your heels.",
        },
        {
          name: "Plank",
          equipment: "Bodyweight",
          instructions: "Maintain a straight line from head to heels.",
        },
      ];
    }

    const exercises = data.slice(0, 5).map((ex) => ({
      name: ex.name,
      equipment: ex.equipment || "Bodyweight",
      instructions: ex.instructions || "",
      sets: normalizedDifficulty === "beginner" ? 3 : 4,
      reps: normalizedDifficulty === "beginner" ? "12-15" : "8-12",
    }));

    // 🔹 Optional auth logic
    const userId = req.user?.userId;


    // Guest → return workout only
    if (!userId) {
      return res.json({
        muscle: normalizedMuscle,
        difficulty: normalizedDifficulty,
        exercises,
        guest: true,
      });
    }

    // 🔹 Logged-in user → SAVE workout
    db.run(
      `INSERT INTO workouts (user_id, muscle, difficulty) VALUES (?, ?, ?)`,
      [userId, normalizedMuscle, normalizedDifficulty],
      function (err) {
        if (err) {
          console.error("Workout insert failed:", err);
          return res.status(500).json({ message: "Failed to save workout" });
        }
          console.log("✅ WORKOUT INSERTED:", this.lastID);

        const workoutId = this.lastID;

        exercises.forEach((ex) => {
          db.run(
            `INSERT INTO workout_exercises
             (workout_id, name, equipment, instructions, sets, reps)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              workoutId,
              ex.name,
              ex.equipment,
              ex.instructions,
              ex.sets,
              ex.reps,
            ]
          );
        });

        res.json({
          muscle: normalizedMuscle,
          difficulty: normalizedDifficulty,
          exercises,
        });
      }
    );
  } catch (error) {
    console.error("Generate workout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
