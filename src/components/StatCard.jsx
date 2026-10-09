/**
 * StatCard Component
 * Displays a metric counter with label and icon/indicator.
 */
export default function StatCard({ label, value, subtext, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-value">{value}</div>
      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
}
