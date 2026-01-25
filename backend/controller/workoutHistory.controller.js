import db from "../database/db.js";

export const getWorkoutHistory = (req, res) => {
  const userId = 1; // temporary (JWT baad me)

  const query = `
    SELECT 
      w.id AS workout_id,
      w.muscle,
      w.difficulty,
      w.created_at,
      e.name,
      e.sets,
      e.reps,
      e.equipment
    FROM workouts w
    JOIN workout_exercises e
      ON w.id = e.workout_id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch history" });
    }

    const historyMap = {};

    rows.forEach((row) => {
      if (!historyMap[row.workout_id]) {
        historyMap[row.workout_id] = {
          workout_id: row.workout_id,
          muscle: row.muscle,
          difficulty: row.difficulty,
          created_at: row.created_at,
          exercises: [],
        };
      }

      historyMap[row.workout_id].exercises.push({
        name: row.name,
        sets: row.sets,
        reps: row.reps,
        equipment: row.equipment,
      });
    });

    const history = Object.values(historyMap);
    res.json(history);
  });
};
