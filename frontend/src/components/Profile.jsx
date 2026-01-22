'use client';

import { useState } from 'react';
import "./Profile.css";


export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  
  // Replace with your Ninja API data
  const userProfile = {
    name: 'Alex Champion',
    email: 'alex@fitforge.com',
    memberSince: 'Jan 2024',
    avatar: '/images/default-avatar.jpg',
    bio: 'Fitness enthusiast | Always pushing limits'
  };

  const workoutStats = [
    { label: 'Total Workouts', value: '127', icon: '💪' },
    { label: 'Total Hours', value: '96h', icon: '⏱️' },
    { label: 'This Week', value: '5 days', icon: '🔥' },
    { label: 'Streak', value: '14 days', icon: '⚡' }
  ];

  const recentExercises = [
    { name: 'Bench Press', reps: '5x5', weight: '185 lbs', difficulty: 'Hard' },
    { name: 'Deadlift', reps: '3x5', weight: '315 lbs', difficulty: 'Hard' },
    { name: 'Squats', reps: '5x5', weight: '225 lbs', difficulty: 'Medium' },
    { name: 'Pull-ups', reps: '3x8', weight: 'Bodyweight', difficulty: 'Medium' }
  ];

  const favoriteWorkouts = [
    { name: 'Chest Day', exercises: 6, duration: '50 min' },
    { name: 'Back & Biceps', exercises: 5, duration: '45 min' },
    { name: 'Leg Day', exercises: 7, duration: '60 min' },
    { name: 'Cardio Blast', exercises: 3, duration: '30 min' }
  ];

  const personalRecords = [
    { exercise: 'Bench Press', weight: '225 lbs', date: 'Jan 15' },
    { exercise: 'Deadlift', weight: '335 lbs', date: 'Jan 10' },
    { exercise: 'Squat', weight: '275 lbs', date: 'Jan 5' }
  ];

  return (
    <div className="profile-wrapper">
      <div className="profile-content-main">
        
        {/* Hero Header Section */}
        <div className="profile-hero">
          <div className="profile-hero-bg"></div>
          <div className="profile-hero-content">
            <div className="profile-avatar-section">
              <img src={userProfile.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar-img" />
              <button className="avatar-badge" onClick={() => setEditMode(!editMode)}>
                ✏️
              </button>
            </div>
            <div className="profile-hero-text">
              <h1 className="profile-name">{userProfile.name}</h1>
              <p className="profile-bio">{userProfile.bio}</p>
              <div className="profile-meta">
                <span>{userProfile.email}</span>
                <span className="dot">•</span>
                <span>Member since {userProfile.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {workoutStats.map((stat, idx) => (
            <div key={idx} className="stat-box">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

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

          {/* Right Column - Personal Records */}
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
        </div>

        {/* Favorite Workouts */}
        <div className="profile-section">
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

        {/* Settings Section */}
        <div className="profile-section">
          <h2>Settings</h2>
          <div className="settings-container">
            <button className="settings-btn">Edit Profile</button>
            <button className="settings-btn">Change Password</button>
            <button className="settings-btn">Preferences</button>
            <button className="settings-btn logout">Logout</button>
          </div>
        </div>

      </div>
    </div>
  );
}
