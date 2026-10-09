import { useState } from 'react';
import GoalCard from '../src/components/GoalCard';

/**
 * Goals Page
 * Displays learning goals with interactive completion checkboxes, category filters, and adding new goals.
 */
export default function Goals({ goals = [], onToggleGoal, onAddGoal }) {
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState('Career');
  const [goalDueDate, setGoalDueDate] = useState('');

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent =
    goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  const filteredGoals = goals.filter((g) => {
    if (filter === 'active') return !g.completed;
    if (filter === 'completed') return g.completed;
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    onAddGoal({
      title: goalTitle.trim(),
      category: goalCategory,
      dueDate: goalDueDate || new Date().toISOString().split('T')[0],
    });

    setGoalTitle('');
    setGoalDueDate('');
    setShowAddForm(false);
  };

  return (
    <div className="goals-page">
      {/* Progress Summary Header */}
      <div className="goals-summary-card">
        <div className="summary-left">
          <h3>Goal Progress Overview</h3>
          <p>
            You have completed {completedCount} out of {goals.length} target goals ({progressPercent}%).
          </p>
        </div>
        <div className="summary-bar-wrapper">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="page-action-bar">
        <div className="category-filters">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Goals ({goals.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            In Progress ({goals.length - completedCount})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Goal
        </button>
      </div>

      {/* Add Goal Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Add Learning Goal</h3>
            <p>Set a measurable milestone for your TwinMind roadmap.</p>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Goal Description / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Master LangChain agents, complete React tests"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value)}
                >
                  <option value="Career">Career</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Completion Date</label>
                <input
                  type="date"
                  value={goalDueDate}
                  onChange={(e) => setGoalDueDate(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="goals-list">
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onToggle={onToggleGoal} />
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="empty-state">
          <p>No goals found in this view.</p>
        </div>
      )}
    </div>
  );
}
