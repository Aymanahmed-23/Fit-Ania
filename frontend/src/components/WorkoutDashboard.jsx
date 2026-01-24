"use client"

import { useState } from 'react'

const muscleGroups = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 
  'Legs', 'Glutes', 'Core', 'Full Body'
]

const difficulties = [
  { name: 'Beginner', desc: 'Perfect for starting out' },
  { name: 'Intermediate', desc: 'Ready for a challenge' },
  { name: 'Advanced', desc: 'Push your limits' },
  { name: 'Expert', desc: 'Maximum intensity' }
]

// Sample workout data - you'll replace this with API calls
const sampleWorkouts = {
  Chest: [
    { name: 'Bench Press', sets: 4, reps: '8-10' },
    { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
    { name: 'Cable Flyes', sets: 3, reps: '12-15' },
    { name: 'Push-ups', sets: 3, reps: 'To failure' },
    { name: 'Dumbbell Pullover', sets: 3, reps: '12' }
  ],
  Back: [
    { name: 'Deadlifts', sets: 4, reps: '6-8' },
    { name: 'Pull-ups', sets: 4, reps: '8-10' },
    { name: 'Bent Over Rows', sets: 3, reps: '10-12' },
    { name: 'Lat Pulldown', sets: 3, reps: '12' },
    { name: 'Face Pulls', sets: 3, reps: '15' }
  ],
  Legs: [
    { name: 'Squats', sets: 4, reps: '8-10' },
    { name: 'Romanian Deadlifts', sets: 3, reps: '10-12' },
    { name: 'Leg Press', sets: 3, reps: '12' },
    { name: 'Walking Lunges', sets: 3, reps: '12 each' },
    { name: 'Calf Raises', sets: 4, reps: '15' }
  ]
}

export default function WorkoutDashboard({ onClose }) {
  const [selectedMuscle, setSelectedMuscle] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [generatedWorkout, setGeneratedWorkout] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

const handleGenerate = async () => {
  if (!selectedMuscle || !selectedDifficulty) return;

  setIsGenerating(true);

  try {
    const response = await fetch("/api/workouts/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        muscle: selectedMuscle,
        difficulty: selectedDifficulty,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate workout");
    }

  const data = await response.json();
  console.log(data);

  setGeneratedWorkout({
    muscle: data.muscle,
    difficulty: data.difficulty,
    exercises: data.exercises.map((ex) => ({
    name: ex.name,
      equipment: ex.equipment || "Bodyweight",
      instructions: ex.instructions || "",
      sets: ex.sets,
      reps: ex.reps,
  })),
});


  } catch (error) {
    console.error("Workout generation error:", error);
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <h2 className="dashboard-title">Workout Generator</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="dashboard-section">
              <h3 className="dashboard-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Choose Muscle Group
              </h3>
              <div className="muscle-grid">
                {muscleGroups.map((muscle) => (
                  <button
                    key={muscle}
                    className={`muscle-btn ${selectedMuscle === muscle ? 'selected' : ''}`}
                    onClick={() => setSelectedMuscle(muscle)}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard-section">
              <h3 className="dashboard-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10M18 20V4M6 20v-4" />
                </svg>
                Select Difficulty
              </h3>
              <div className="difficulty-options">
                {difficulties.map((diff) => (
                  <button
                    key={diff.name}
                    className={`difficulty-btn ${selectedDifficulty === diff.name ? 'selected' : ''}`}
                    onClick={() => setSelectedDifficulty(diff.name)}
                  >
                    <div>
                      <div className="difficulty-name">{diff.name}</div>
                      <div className="difficulty-desc">{diff.desc}</div>
                    </div>
                    {selectedDifficulty === diff.name && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="generate-section">
              <button 
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!selectedMuscle || !selectedDifficulty || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Workout
                  </>
                )}
              </button>
            </div>

            {generatedWorkout && (
              <div className="workout-result animate-fade-in">
                <div className="workout-result-header">
                  <h3 className="workout-result-title">Your {generatedWorkout.muscle} Workout</h3>
                  <div className="workout-result-meta">
                    <span className="workout-meta-tag">{generatedWorkout.difficulty}</span>
                    <span className="workout-meta-tag">{generatedWorkout.exercises.length} exercises</span>
                  </div>
                </div>
                <div className="workout-exercises">
                  {generatedWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="workout-exercise-card">
                      <div className="exercise-number">{index + 1}</div>
                      <div className="exercise-info">
                        <div className="exercise-name">{exercise.name}</div>
                        <div className="exercise-details">
                          {exercise.sets} sets x {exercise.reps} reps
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
