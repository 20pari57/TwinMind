import StatCard from '../src/components/StatCard';
import SkillCard from '../src/components/SkillCard';
import GoalCard from '../src/components/GoalCard';
import InsightCard from '../src/components/InsightCard';

/**
 * Dashboard Page
 * Combines StatCards, InsightCards, SkillCards, and GoalCards into a coherent overview.
 */
export default function Dashboard({
  skills = [],
  goals = [],
  insights = [],
  onSkillLevelChange,
  onToggleGoal,
  onNavigate,
}) {
  // Compute summary stats
  const totalSkills = skills.length;
  const avgLevel =
    totalSkills > 0
      ? Math.round(skills.reduce((sum, s) => sum + s.level, 0) / totalSkills)
      : 0;
  const completedGoals = goals.filter((g) => g.completed).length;
  const pendingGoals = goals.filter((g) => !g.completed);

  return (
    <div className="dashboard-content">
      {/* Stat Cards Grid */}
      <section className="stats-grid">
        <StatCard
          label="Overall Mastery"
          value={`${avgLevel}%`}
          subtext="Across all competencies"
          icon="📈"
        />
        <StatCard
          label="Tracked Skills"
          value={totalSkills}
          subtext="Active in your matrix"
          icon="⚡"
        />
        <StatCard
          label="Goals Completed"
          value={`${completedGoals} / ${goals.length}`}
          subtext={`${pendingGoals.length} in progress`}
          icon="🎯"
        />
        <StatCard
          label="AI Readiness"
          value="82%"
          subtext="Targeting AI-ML role"
          icon="🚀"
        />
      </section>

      {/* Learning Insights Section */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>TwinMind Insights</h2>
            <p>Smart recommendations based on your current performance and goals.</p>
          </div>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onNavigate('ai-chat')}
          >
            Chat with AI 💬
          </button>
        </div>

        <div className="insights-grid">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* Skills Showcase Grid */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>Core Skills</h2>
            <p>Directly inspect and adjust your skill scores to see real-time updates.</p>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => onNavigate('skills')}
          >
            Manage All Skills →
          </button>
        </div>

        <div className="skills-grid">
          {skills.slice(0, 4).map((skill) => (
            <SkillCard
              key={skill.id}
              id={skill.id}
              name={skill.name}
              level={skill.level}
              category={skill.category}
              status={skill.status}
              onLevelChange={onSkillLevelChange}
            />
          ))}
        </div>
      </section>

      {/* Goals Preview */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>Active Learning Goals</h2>
            <p>Check off completed tasks to update your dashboard progress.</p>
          </div>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onNavigate('goals')}
          >
            All Goals ({goals.length})
          </button>
        </div>

        <div className="goals-list">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onToggle={onToggleGoal} />
          ))}
        </div>
      </section>
    </div>
  );
}
