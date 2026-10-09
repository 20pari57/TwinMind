import { useState } from 'react';

/**
 * Header Component
 * Displays current page title, theme toggle, and profile quick menu.
 */
export default function Header({ activePage, theme, onToggleTheme, user, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getPageInfo = () => {
    switch (activePage) {
      case 'dashboard':
        return {
          title: 'TwinMind Dashboard',
          subtitle: 'Welcome back! Overview of your cognitive, technical, and goal progress.',
        };
      case 'skills':
        return {
          title: 'Skills Matrix',
          subtitle: 'Manage and update your competencies, mastery scores, and proficiency levels.',
        };
      case 'goals':
        return {
          title: 'Learning Goals',
          subtitle: 'Track milestones, tasks, and deadlines toward your target roles.',
        };
      case 'simulation':
        return {
          title: 'Outcome Simulation',
          subtitle: 'Simulate career readiness, skill gap analyses, and internship match scores.',
        };
      case 'ai-chat':
        return {
          title: 'AI Companion',
          subtitle: 'Context-aware intelligence powered by your personalized learning data.',
        };
      case 'profile':
        return {
          title: 'User Profile',
          subtitle: 'Manage your aspirations, target positions, and account preferences.',
        };
      default:
        return {
          title: 'TwinMind',
          subtitle: 'Personal intelligence platform.',
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="app-header">
      <div className="header-titles">
        <h1 className="header-title">{pageInfo.title}</h1>
        <p className="header-subtitle">{pageInfo.subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Theme Toggle */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Profile Avatar / Menu */}
        <div className="profile-menu-container">
          <button
            type="button"
            className="profile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Profile Menu"
          >
            <div className="header-avatar">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'TM'}
            </div>
            <span className="header-user-name">{user?.name || 'Explorer'}</span>
            <span className="dropdown-arrow">▾</span>
          </button>

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-user-header">
                <strong>{user?.name || 'Explorer'}</strong>
                <small>{user?.email || 'pariaarijita52@gmail.com'}</small>
              </div>
              <hr />
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('profile');
                }}
              >
                👤 View Profile
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('ai-chat');
                }}
              >
                🤖 Ask AI Companion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
