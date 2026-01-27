'use client';

import { useEffect, useState } from 'react';
import "./Profile.css";
import { authHeaders, logout } from "../utils/auth";
import { Link } from "react-router-dom";
import ProfileHero from "./ProfileHero";
import { API_BASE } from "../config";




export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));



useEffect(() => {

  const token = localStorage.getItem("authToken");
if (!token) {
  window.location.href = "/sign-in";
  return;
}


fetch(`${API_BASE}/api/workouts/history`, {
  headers: {
    ...authHeaders(),
  },
})
  .then(res => {
    if (res.status === 401) {
      logout();
      return;
    }
    return res.json();
  })
  .then(data => setHistory(data));


  fetch(`${API_BASE}/api/workouts/stats`, {
    headers: {
      ...authHeaders(),
    },
  })
    .then(res => res.json())
    .then(data => setStats(data));
}, []);

  
 const userProfile = {
  name: user?.name || "Athlete",
  email: user?.email || "",
  avatar: user?.avatar || "/placeholder.svg",
  bio: user?.bio || "Consistency beats motivation.",
  memberSince: "2024",
};

  



  const recentExercises = history
    .flatMap(workout =>
      workout.exercises.map(ex => ({
        name: ex.name,
        reps: `${ex.sets} x ${ex.reps}`,
        weight: ex.equipment || "Bodyweight",
        difficulty: workout.difficulty
      }))
    )
    .slice(0, 6);



  {/*

  const personalRecords = [
    { exercise: 'Bench Press', weight: '225 lbs', date: 'Jan 15' },
    { exercise: 'Deadlift', weight: '335 lbs', date: 'Jan 10' },
    { exercise: 'Squat', weight: '275 lbs', date: 'Jan 5' }
  ]; */}

  return (
    <div className="profile-wrapper">
      <div className="profile-content-main">
        
        {/* Hero Header Section */}
<ProfileHero
  userProfile={userProfile}
  editMode={editMode}
  setEditMode={setEditMode}
/>


{stats && (
  <div className="stats-grid">
    <div className="stat-box">
      <span className="stat-number">{stats.totalWorkouts}</span>
      <span className="stat-label">Total Workouts</span>
    </div>

    <div className="stat-box">
      <span className="stat-number">{stats.thisWeek}</span>
      <span className="stat-label">This Week</span>
    </div>

    <div className="stat-box">
      <span className="stat-number">{stats.topMuscle || "-"}</span>
      <span className="stat-label">Top Muscle</span>
    </div>
  </div>
)}


        {/* Two Column Layout */}
        <div className="profile-grid">
          
          {/* Left Column - Recent Exercises */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Recent Exercises</h2>
              <a href="#" className="section-link">View All</a>
            </div>
            <div className="exercises-list">
              {recentExercises.map((exercise, idx) => (
                <div key={idx} className="exercise-item">
                  <div className="exercise-info">
                    <h3 className="exercise-name">{exercise.name}</h3>
                    <p className="exercise-meta">{exercise.reps} • {exercise.weight}</p>
                  </div>
                  <span className={`badge badge-${exercise.difficulty.toLowerCase()}`}>
                    {exercise.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Personal Records 
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Records</h2>
              <a href="#" className="section-link">Edit</a>
            </div>
            <div className="records-list">
              {personalRecords.map((record, idx) => (
                <div key={idx} className="record-item">
                  <div className="record-exercise">
                    <span className="record-name">{record.exercise}</span>
                    <span className="record-date">{record.date}</span>
                  </div>
                  <span className="record-weight">{record.weight}</span>
                </div>
              ))}
            </div>
          </div>
          */}
        </div>

        {/* Favorite Workouts */}
        {/*
        <div className="profile-section">
          {/*
          <div className="section-header">
            <h2>Favorite Workouts</h2>
            <a href="#" className="section-link">Create New</a>
          </div>
          
          <div className="workouts-grid">
            
            {favoriteWorkouts.map((workout, idx) => (
              <div key={idx} className="workout-card">
                <div className="workout-icon">💪</div>
                <h3 className="workout-name">{workout.name}</h3>
                <div className="workout-stats">
                  <span>{workout.exercises} exercises</span>
                  <span>{workout.duration}</span>
                </div>
                <button className="btn-workout">Start</button>
              </div>
            ))}
          </div>

        </div>
        */}

        {/* Settings Section */}
        <div className="profile-section">
          <h2>Settings</h2>
          <div className="settings-container">
            <button className="settings-btn">Edit Profile</button>
            <button className="settings-btn">Change Password</button>
            <button className="settings-btn">Preferences</button>
           <button className="settings-btn logout" onClick={logout}>
  Logout
</button>

          </div>
        </div>

      </div>
    </div>
  );
}
