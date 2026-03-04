import Workout from "../models/workout.model.js";

export const getWorkoutStats = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const stats = {};

    // total workouts
    stats.totalWorkouts = await Workout.countDocuments({ user: userId });

    // workouts this week
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    stats.thisWeek = await Workout.countDocuments({
      user: userId,
      createdAt: { $gte: sevenDaysAgo },
    });

    // most trained muscle
    const topMuscle = await Workout.aggregate([
      { $match: { user: req.user.userId } },
      {
        $group: {
          _id: "$muscle",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    stats.topMuscle = topMuscle.length ? topMuscle[0]._id : null;

    res.json(stats);

  } catch (error) {
    console.error("Workout stats error:", error);
    res.status(500).json({ message: "Stats error" });
  }
};