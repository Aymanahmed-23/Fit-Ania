import Workout from "../models/workout.model.js";

export const getWorkoutHistory = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workouts = await Workout.find({ user: userId })
      .sort({ createdAt: -1 });

    const history = workouts.map((workout) => ({
      workout_id: workout._id,
      muscle: workout.muscle,
      difficulty: workout.difficulty,
      created_at: workout.createdAt,
      exercises: workout.exercises.map((ex) => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        equipment: ex.equipment,
        instructions: ex.instructions,
      })),
    }));

    res.json(history);

  } catch (error) {
    console.error("Fetch workout history error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};