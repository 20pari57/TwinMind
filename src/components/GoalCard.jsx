/**
 * GoalCard Component
 * Displays a learning goal, category, target date, and interactive completion status.
 */
export default function GoalCard({ goal, onToggle }) {
  if (!goal) return null;

  return (
    <div className={`goal-card ${goal.completed ? 'goal-completed' : ''}`}>
      <div className="goal-card-main">
        <label className="goal-checkbox-wrapper">
          <input
            type="checkbox"
            checked={Boolean(goal.completed)}
            onChange={() => onToggle && onToggle(goal.id)}
            className="goal-checkbox"
          />
          <span className="goal-checkmark" />
        </label>

        <div className="goal-content">
          <div className="goal-meta">
            <span className="goal-category">{goal.category}</span>
            {goal.dueDate && <span className="goal-due">Due: {goal.dueDate}</span>}
          </div>
          <h4 className="goal-title">{goal.title}</h4>
        </div>
      </div>

      <div className="goal-status-badge">
        {goal.completed ? (
          <span className="badge badge-success">Completed</span>
        ) : (
          <span className="badge badge-pending">In Progress</span>
        )}
      </div>
    </div>
  );
}
