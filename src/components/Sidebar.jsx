/**
 * Sidebar Component
 * Provides primary navigation between TwinMind sections.
 */
export default function Sidebar({ activePage, onNavigate, user }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'simulation', label: 'Simulation', icon: '🔮' },
    { id: 'ai-chat', label: 'AI Companion', icon: '🤖' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🧠</div>
        <div className="brand-text">
          <span className="brand-name">TwinMind</span>
          <span className="brand-subtitle">Personal Growth AI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-button ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-avatar">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'TM'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Explorer'}</span>
            <span className="user-role">{user?.targetRole || 'AI Aspirant'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
