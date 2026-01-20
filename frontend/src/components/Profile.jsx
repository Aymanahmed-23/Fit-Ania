import { useState } from 'react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample user data - replace with your API data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joined: 'January 2024',
    avatar: '/images/default-avatar.jpg'
  };

  const stats = [
    { label: 'Workouts', value: '47' },
    { label: 'This Week', value: '5' },
    { label: 'Streak', value: '12 days' },
    { label: 'Calories', value: '24,500' }
  ];

  const recentWorkouts = [
    { date: 'Today', type: 'Chest & Triceps', duration: '45 min', difficulty: 'Hard' },
    { date: 'Yesterday', type: 'Back & Biceps', duration: '50 min', difficulty: 'Medium' },
    { date: 'Jan 18', type: 'Legs', duration: '55 min', difficulty: 'Hard' },
    { date: 'Jan 17', type: 'Cardio', duration: '30 min', difficulty: 'Easy' }
  ];

  const achievements = [
    { icon: '🔥', title: '7-Day Streak', desc: 'Worked out 7 days in a row' },
    { icon: '💪', title: 'First Workout', desc: 'Completed your first workout' },
    { icon: '🏆', title: '10 Workouts', desc: 'Completed 10 total workouts' },
    { icon: '⚡', title: 'Early Bird', desc: 'Worked out before 7 AM' }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.avatar || "/placeholder.svg"} alt="Profile" />
            <button className="avatar-edit">Edit</button>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">Member since {user.joined}</p>
          </div>
          <button className="profile-edit-btn">Edit Profile</button>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className="profile-stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`profile-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Workout History
          </button>
          <button 
            className={`profile-tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button 
            className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-section">
                <h3>Recent Activity</h3>
                <div className="recent-list">
                  {recentWorkouts.slice(0, 3).map((workout, index) => (
                    <div key={index} className="recent-item">
                      <div className="recent-info">
                        <span className="recent-type">{workout.type}</span>
                        <span className="recent-date">{workout.date}</span>
                      </div>
                      <span className={`recent-difficulty ${workout.difficulty.toLowerCase()}`}>
                        {workout.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-section">
                <h3>Quick Stats</h3>
                <div className="quick-stats">
                  <div className="quick-stat">
                    <span className="qs-label">Favorite Muscle</span>
                    <span className="qs-value">Chest</span>
                  </div>
                  <div className="quick-stat">
                    <span className="qs-label">Avg Duration</span>
                    <span className="qs-value">45 min</span>
                  </div>
                  <div className="quick-stat">
                    <span className="qs-label">Preferred Difficulty</span>
                    <span className="qs-value">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="history-list">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="history-item">
                    <div className="history-date">{workout.date}</div>
                    <div className="history-details">
                      <span className="history-type">{workout.type}</span>
                      <span className="history-duration">{workout.duration}</span>
                    </div>
                    <span className={`history-difficulty ${workout.difficulty.toLowerCase()}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-tab">
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <span className="achievement-icon">{achievement.icon}</span>
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-desc">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-group">
                <h3>Account Settings</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-label">Email Notifications</span>
                    <span className="setting-desc">Receive workout reminders</span>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-label">Dark Mode</span>
                    <span className="setting-desc">Use dark theme</span>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-label">Units</span>
                    <span className="setting-desc">Metric (kg, km)</span>
                  </div>
                  <button className="setting-btn">Change</button>
                </div>
              </div>
              
              <div className="settings-group">
                <h3>Danger Zone</h3>
                <button className="danger-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}