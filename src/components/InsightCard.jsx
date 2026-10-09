/**
 * InsightCard Component
 * Displays an intelligent learning insight or recommendation.
 */
export default function InsightCard({ insight, title, description, tag, type }) {
  const displayTitle = title ?? insight?.title ?? 'Learning Insight';
  const displayDesc = description ?? insight?.description ?? '';
  const displayTag = tag ?? insight?.tag ?? 'Recommendation';
  const displayType = type ?? insight?.type ?? 'recommendation';

  return (
    <div className={`insight-card insight-${displayType}`}>
      <div className="insight-header">
        <span className="insight-badge">{displayTag}</span>
      </div>
      <h4 className="insight-title">{displayTitle}</h4>
      <p className="insight-description">{displayDesc}</p>
    </div>
  );
}
