import db from "../database/db.js";

export const getWorkoutStats = (req, res) => {
   const userId = req.user.id;

  const stats = {};

  db.get(
    `SELECT COUNT(*) as total FROM workouts WHERE user_id = ?`,
    [userId],
    (err, row) => {
      if (err) return res.status(500).json({ message: "Stats error" });

      stats.totalWorkouts = row.total;

      db.get(
        `SELECT COUNT(*) as weekCount 
         FROM workouts 
         WHERE user_id = ? 
         AND created_at >= date('now','-7 day')`,
        [userId],
        (err, row) => {
          if (err) return res.status(500).json({ message: "Stats error" });

          stats.thisWeek = row.weekCount;

          db.get(
            `SELECT muscle, COUNT(*) as count 
             FROM workouts 
             WHERE user_id = ?
             GROUP BY muscle 
             ORDER BY count DESC 
             LIMIT 1`,
            [userId],
            (err, row) => {
              if (err) return res.status(500).json({ message: "Stats error" });

              stats.topMuscle = row ? row.muscle : null;

              res.json(stats);
            }
          );
        }
      );
    }
  );
};
