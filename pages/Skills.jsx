import { useState } from 'react';
import SkillCard from '../src/components/SkillCard';

/**
 * Skills Page
 * Comprehensive skills matrix with category filtering, real-time level sliders, and adding new skills.
 */
export default function Skills({ skills = [], onSkillLevelChange, onAddSkill }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState(70);

  const categories = ['All', ...new Set(skills.map((s) => s.category))];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    onAddSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: Number(newSkillLevel),
    });

    setNewSkillName('');
    setNewSkillLevel(70);
    setShowAddModal(false);
  };

  return (
    <div className="skills-page">
      <div className="page-action-bar">
        {/* Category Filter Pills */}
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Skill
        </button>
      </div>

      {/* Add Skill Modal / Form */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Skill</h3>
            <p>Add a new technical or cognitive competency to your TwinMind matrix.</p>
            <form onSubmit={handleCreateSkill}>
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Deep Learning, GraphQL, TypeScript"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                >
                  <option value="Programming">Programming</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cognitive">Cognitive</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <div className="form-group">
                <label>Initial Mastery Level: {newSkillLevel}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill) => (
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

      {filteredSkills.length === 0 && (
        <div className="empty-state">
          <p>No skills found in the "{selectedCategory}" category.</p>
        </div>
      )}
    </div>
  );
}
