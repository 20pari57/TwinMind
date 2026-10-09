import { useState } from 'react';

/**
 * Simulation Page
 * Simulates role readiness, skill matching, and gap analysis for career targets.
 */
export default function Simulation({ skills = [] }) {
  const [selectedRole, setSelectedRole] = useState('ai_intern');

  const careerRoles = {
    ai_intern: {
      title: 'AI / ML Engineering Intern',
      targetSkills: [
        { name: 'Python', required: 80 },
        { name: 'Machine Learning Fundamentals', required: 75 },
        { name: 'Critical Thinking & Problem Solving', required: 70 },
      ],
      description: 'Prepares you for junior AI/ML positions focusing on model training, data handling, and algorithm evaluation.',
    },
    fullstack: {
      title: 'Full-Stack Developer',
      targetSkills: [
        { name: 'React Architecture', required: 80 },
        { name: 'System Design & APIs', required: 75 },
        { name: 'Cloud Deployment & Docker', required: 65 },
      ],
      description: 'Focuses on end-to-end web apps, component reusability, state patterns, and API integration.',
    },
    system_architect: {
      title: 'Systems & Backend Engineer',
      targetSkills: [
        { name: 'Python', required: 75 },
        { name: 'System Design & APIs', required: 85 },
        { name: 'Cloud Deployment & Docker', required: 75 },
      ],
      description: 'Scalable services, distributed architectures, caching, and database performance.',
    },
  };

  const role = careerRoles[selectedRole];

  // Pure calculation of skill gaps
  const skillGaps = role.targetSkills.map((req) => {
    const current = skills.find((s) => s.name.toLowerCase() === req.name.toLowerCase());
    const currentLevel = current ? current.level : 40;
    const gap = req.required - currentLevel;

    return {
      name: req.name,
      required: req.required,
      current: currentLevel,
      gap: gap > 0 ? gap : 0,
      met: currentLevel >= req.required,
      achieved: Math.min(req.required, currentLevel),
    };
  });

  const totalRequired = skillGaps.reduce((acc, item) => acc + item.required, 0);
  const totalAchieved = skillGaps.reduce((acc, item) => acc + item.achieved, 0);
  const readinessScore = totalRequired > 0 ? Math.round((totalAchieved / totalRequired) * 100) : 0;

  return (
    <div className="simulation-page">
      <div className="simulation-selector-card">
        <h3>Select Career Role to Simulate</h3>
        <p>TwinMind evaluates your live skills against industry benchmarks.</p>
        <div className="role-buttons">
          {Object.entries(careerRoles).map(([key, r]) => (
            <button
              key={key}
              type="button"
              className={`role-select-btn ${selectedRole === key ? 'active' : ''}`}
              onClick={() => setSelectedRole(key)}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      <div className="simulation-results-grid">
        <div className="sim-metric-card">
          <span className="sim-score-label">Role Readiness Score</span>
          <div className="sim-big-score">{readinessScore}%</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${readinessScore}%` }} />
          </div>
          <p className="sim-status-text">
            {readinessScore >= 85
              ? '🔥 Highly Competitive Candidate'
              : readinessScore >= 70
              ? '⚡ Solid Foundation — A few targets to level up'
              : '🌱 Building Foundations — Follow roadmap below'}
          </p>
        </div>

        <div className="sim-breakdown-card">
          <h3>Skill Gap Analysis</h3>
          <p>{role.description}</p>
          <div className="gap-list">
            {skillGaps.map((item) => (
              <div key={item.name} className="gap-item">
                <div className="gap-header">
                  <strong>{item.name}</strong>
                  <span>
                    Current: <strong>{item.current}</strong> / Target: <strong>{item.required}</strong>
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, (item.current / item.required) * 100)}%`,
                    }}
                  />
                </div>
                <div className="gap-footer">
                  {item.met ? (
                    <span className="gap-badge met">✓ Target Met</span>
                  ) : (
                    <span className="gap-badge gap">Needs +{item.gap} points</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
