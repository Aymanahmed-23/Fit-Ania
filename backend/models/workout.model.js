import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  muscle: String,
  difficulty: String,
  exercises: [
    {
      name: String,
      equipment: String,
      instructions: String,
      sets: Number,
      reps: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Workout", workoutSchema);