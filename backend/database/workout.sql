CREATE TABLE IF NOT EXISTS workout_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  equipment TEXT,
  instructions TEXT,
  sets INTEGER,
  reps TEXT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

