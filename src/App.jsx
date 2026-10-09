import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Skills from '../pages/Skills';
import Goals from '../pages/Goals';
import Simulation from '../pages/Simulation';
import AIChat from '../pages/AIChat';
import Profile from '../pages/Profile';
import api from '../services/api';
import './App.css';

/**
 * App Component
 * Core TwinMind Application Shell:
 * - Left Navigation Sidebar
 * - Top Header with theme toggle and user profile
 * - Dynamic page routing (Dashboard, Skills, Goals, Simulation, AI Companion, Profile)
 * - State and UI updates for skills, goals, insights, and user preferences
 */
function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [insights, setInsights] = useState([]);
  const [user, setUser] = useState({
    name: 'Arijita Pari',
    email: 'pariaarijita52@gmail.com',
    targetRole: 'AI-ML Engineer Intern',
  });

  // Load initial data from api service
  useEffect(() => {
    async function loadData() {
      const loadedSkills = await api.getSkills();
      const loadedGoals = await api.getGoals();
      const loadedInsights = await api.getInsights();
      setSkills(loadedSkills);
      setGoals(loadedGoals);
      setInsights(loadedInsights);

      const savedUser = localStorage.getItem('twinmind_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }

      const savedTheme = localStorage.getItem('twinmind_theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    loadData();
  }, []);

  // Theme toggle
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('twinmind_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Skill level updater
  const handleSkillLevelChange = async (id, newLevel) => {
    const updated = await api.updateSkillLevel(id, newLevel);
    setSkills(updated);
  };

  // Add new skill
  const handleAddSkill = async (skillData) => {
    const updated = await api.addSkill(skillData);
    setSkills(updated);
  };

  // Goal completion toggle
  const handleToggleGoal = async (id) => {
    const updated = await api.toggleGoal(id);
    setGoals(updated);
  };

  // Add new goal
  const handleAddGoal = async (goalData) => {
    const updated = await api.addGoal(goalData);
    setGoals(updated);
  };

  // Update user profile
  const handleUpdateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('twinmind_user', JSON.stringify(userData));
  };

  return (
    <div className={`app-layout theme-${theme}`}>
      {/* Left Navigation Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        user={user}
      />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        <Header
          activePage={activePage}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          user={user}
          onNavigate={setActivePage}
        />

        <main className="app-main-content">
          {activePage === 'dashboard' && (
            <Dashboard
              skills={skills}
              goals={goals}
              insights={insights}
              onSkillLevelChange={handleSkillLevelChange}
              onToggleGoal={handleToggleGoal}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'skills' && (
            <Skills
              skills={skills}
              onSkillLevelChange={handleSkillLevelChange}
              onAddSkill={handleAddSkill}
            />
          )}

          {activePage === 'goals' && (
            <Goals
              goals={goals}
              onToggleGoal={handleToggleGoal}
              onAddGoal={handleAddGoal}
            />
          )}

          {activePage === 'simulation' && (
            <Simulation skills={skills} />
          )}

          {activePage === 'ai-chat' && (
            <AIChat skills={skills} goals={goals} />
          )}

          {activePage === 'profile' && (
            <Profile
              user={user}
              onUpdateUser={handleUpdateUser}
              skills={skills}
              goals={goals}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
