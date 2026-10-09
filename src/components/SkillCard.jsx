import { useState } from 'react';

/**
 * SkillCard Component
 * Displays one skill and its progress.
 * Receives: name, level, category, id, onLevelChange (or skill object)
 */
export default function SkillCard({
  id,
  name,
  level = 70,
  category = 'General',
  status,
  onLevelChange,
  skill,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Support both direct props and skill prop
  const skillId = id ?? skill?.id;
  const skillName = name ?? skill?.name ?? 'Skill';
  const skillLevel = Number(level ?? skill?.level ?? 70);
  const skillCategory = category ?? skill?.category ?? 'General';

  // Determine status if not explicitly passed
  const displayStatus =
    status ??
    skill?.status ??
    (skillLevel >= 85
      ? 'Expert'
      : skillLevel >= 75
      ? 'Advanced'
      : skillLevel >= 60
      ? 'Proficient'
      : skillLevel >= 40
      ? 'Intermediate'
      : 'Beginner');

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    if (onLevelChange && skillId !== undefined) {
      onLevelChange(skillId, val);
    }
  };

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="skill-info">
          <p className="skill-category">{skillCategory}</p>
          <h3>{skillName}</h3>
        </div>
        <div className="skill-score">
          {skillLevel}
          <small>/100</small>
        </div>
      </div>

      <div className="progress-track" title={`${skillLevel}% Mastery`}>
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, skillLevel))}%` }}
        />
      </div>

      <div className="skill-card-footer">
        <span className="skill-status">{displayStatus}</span>
        <div className="skill-card-actions">
          <span className="skill-percentage">{skillLevel}%</span>
          {onLevelChange && (
            <button
              type="button"
              className="skill-edit-btn"
              onClick={() => setIsEditing(!isEditing)}
              title="Edit skill level"
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          )}
        </div>
      </div>

      {isEditing && onLevelChange && (
        <div className="skill-level-editor">
          <label htmlFor={`slider-${skillId || skillName}`}>
            Adjust Level: <strong>{skillLevel}</strong>
          </label>
          <input
            id={`slider-${skillId || skillName}`}
            type="range"
            min="0"
            max="100"
            value={skillLevel}
            onChange={handleSliderChange}
            className="skill-slider"
          />
        </div>
      )}
    </div>
  );
}
