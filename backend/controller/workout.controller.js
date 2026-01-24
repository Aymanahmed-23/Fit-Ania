export const generateWorkout = async (req, res) => {
  try {
    const { muscle, difficulty } = req.body;

    if (!muscle || !difficulty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedMuscle = muscle.toLowerCase();
    const normalizedDifficulty = difficulty.toLowerCase();

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${normalizedMuscle}&difficulty=${normalizedDifficulty}`;

    const response = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY,
      },
    });

    if (!response.ok) {
      return res.status(502).json({ message: "Ninja API failed" });
    }

    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ message: "No exercises found" });
    }

    const exercises = data.slice(0, 5).map((ex) => ({
      name: ex.name,
      equipment: ex.equipment || "Bodyweight",
      instructions: ex.instructions || "",
      sets: normalizedDifficulty === "beginner" ? 3 : 4,
      reps: normalizedDifficulty === "beginner" ? "12-15" : "8-12",
    }));

    res.json({
      muscle: normalizedMuscle,
      difficulty: normalizedDifficulty,
      exercises,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
