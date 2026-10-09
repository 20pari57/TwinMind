import { useState } from 'react';

/**
 * Profile Page
 * User profile preferences, target role, and account settings.
 */
export default function Profile({ user, onUpdateUser, skills = [], goals = [] }) {
  const [name, setName] = useState(user?.name || 'Arijita Pari');
  const [email, setEmail] = useState(user?.email || 'pariaarijita52@gmail.com');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'AI-ML Engineer Intern');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, email, targetRole });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const completedGoals = goals.filter((g) => g.completed).length;

  return (
    <div className="profile-page">
      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-header-visual">
            <div className="profile-big-avatar">
              {name.slice(0, 2).toUpperCase()}
            </div>
            <h3>{name}</h3>
            <p className="profile-target-role">{targetRole}</p>
          </div>

          <div className="profile-stats-summary">
            <div className="summary-stat">
              <strong>{skills.length}</strong>
              <span>Skills Tracked</span>
            </div>
            <div className="summary-stat">
              <strong>{completedGoals}</strong>
              <span>Goals Done</span>
            </div>
            <div className="summary-stat">
              <strong>Level 4</strong>
              <span>Explorer</span>
            </div>
          </div>
        </div>

        <div className="profile-form-card">
          <h3>Profile & Aspiration Settings</h3>
          <p>Customize your profile and goal targeting preferences.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Target Career Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. AI-ML Engineering Intern"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Preferences
              </button>
              {savedMsg && <span className="save-toast">✓ Saved successfully!</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
