import fetch from "node-fetch";
import Workout from "../models/workout.model.js";

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

       const muscleMap = {
  abs: "waist",
  arms: "upper arms",
  legs: "upper legs",
  chest: "chest",
  back: "back",
  shoulders: "shoulders",
};

const apiMuscle = muscleMap[normalizedMuscle] || normalizedMuscle;

   
    const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${apiMuscle}`;

 

    let data = [];

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-RapidAPI-Key": process.env.EXERCISE_DB_KEY,
          "X-RapidAPI-Host": process.env.EXERCISE_DB_HOST,
        },
      });

      if (response.ok) {
        data = await response.json();
      } else {
        console.warn("ExerciseDB API failed, using fallback");
      }
    } catch (err) {
      console.warn("ExerciseDB API error, using fallback");
    }

let usedFallback = false;

// fallback exercises
if (!data.length) {
  usedFallback = true;

  data = [
    {
      name: "Push Ups",
      equipment: "Bodyweight",
      instructions: ["Lower body until chest nearly touches floor"],
    },
    {
      name: "Squats",
      equipment: "Bodyweight",
      instructions: ["Keep chest up and push through heels"],
    },
    {
      name: "Plank",
      equipment: "Bodyweight",
      instructions: ["Maintain a straight body line"],
    },
  ];
}


    const exercises = data.slice(0, 5).map((ex) => ({
      name: ex.name,
      equipment: ex.equipment || "Bodyweight",
      instructions: Array.isArray(ex.instructions)
        ? ex.instructions.join(" ")
        : ex.instructions || "",
      sets: normalizedDifficulty === "beginner" ? 3 : 4,
      reps: normalizedDifficulty === "beginner" ? "12-15" : "8-12",
    }));

    const userId = req.user?.userId;

    // guest user
    if (!userId) {
  return res.json({
    muscle: normalizedMuscle,
    difficulty: normalizedDifficulty,
    exercises,
    fallback: usedFallback,
    message: usedFallback
      ? `No exercises found for "${normalizedMuscle}". Showing default exercises.`
      : null,
    guest: true,
  });
}

    // save workout to MongoDB
    const workout = await Workout.create({
      user: userId,
      muscle: normalizedMuscle,
      difficulty: normalizedDifficulty,
      exercises,
    });

    res.json({
      muscle: normalizedMuscle,
      difficulty: normalizedDifficulty,
      exercises,
      workoutId: workout._id,
    });

  } catch (error) {
    console.error("Generate workout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};