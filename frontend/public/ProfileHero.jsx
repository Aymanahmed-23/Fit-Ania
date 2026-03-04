
export default function ProfileHero({ userProfile, editMode, setEditMode }) {
  return (
    <div className="profile-hero">
      <div className="profile-hero-bg"></div>

      <div className="profile-hero-content">
        <div className="profile-avatar-section">
          <img
            src={userProfile.avatar || "/placeholder.svg"}
            alt="Profile"
            className="profile-avatar-img"
          />

          <button
            className="avatar-badge"
            onClick={() => setEditMode(!editMode)}
          >
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
  );
}
