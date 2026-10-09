// services/api.js - TwinMind API service layer
// Handles communication with backend (FastAPI) with local fallback persistence

const STORAGE_KEYS = {
  SKILLS: 'twinmind_skills',
  GOALS: 'twinmind_goals',
  CHATS: 'twinmind_chats',
};

const INITIAL_SKILLS = [
  {
    id: 1,
    name: 'Python',
    level: 80,
    category: 'Programming',
    status: 'Advanced',
  },
  {
    id: 2,
    name: 'React Architecture',
    level: 75,
    category: 'Frontend',
    status: 'Proficient',
  },
  {
    id: 3,
    name: 'Machine Learning Fundamentals',
    level: 65,
    category: 'AI & Data Science',
    status: 'Intermediate',
  },
  {
    id: 4,
    name: 'System Design & APIs',
    level: 70,
    category: 'Backend',
    status: 'Proficient',
  },
  {
    id: 5,
    name: 'Critical Thinking & Problem Solving',
    level: 85,
    category: 'Cognitive',
    status: 'Advanced',
  },
  {
    id: 6,
    name: 'Cloud Deployment & Docker',
    level: 60,
    category: 'DevOps',
    status: 'Intermediate',
  },
];

const INITIAL_GOALS = [
  {
    id: 1,
    title: 'Complete FastAPI microservices tutorial',
    category: 'Backend',
    dueDate: '2026-10-20',
    completed: false,
    progress: 60,
  },
  {
    id: 2,
    title: 'Build PyTorch neural network from scratch',
    category: 'AI & Data Science',
    dueDate: '2026-10-31',
    completed: false,
    progress: 40,
  },
  {
    id: 3,
    title: 'Refactor TwinMind state and UI components',
    category: 'Frontend',
    dueDate: '2026-10-15',
    completed: true,
    progress: 100,
  },
  {
    id: 4,
    title: 'Prepare resume for AI-ML internship',
    category: 'Career',
    dueDate: '2026-11-05',
    completed: false,
    progress: 25,
  },
];

const INITIAL_INSIGHTS = [
  {
    id: 1,
    type: 'recommendation',
    title: 'AI-ML Internship Roadmap',
    description: 'Boost your Machine Learning level to 75%+ and add a FastAPI backend project to be highly competitive for upcoming openings.',
    tag: 'Priority',
  },
  {
    id: 2,
    type: 'milestone',
    title: 'Consistent Progress',
    description: 'You improved 3 core skills this week. Keep your daily streak active to reinforce concept retention.',
    tag: 'Streak: 5 Days',
  },
  {
    id: 3,
    type: 'focus',
    title: 'Cognitive Synergy',
    description: 'Your high score in Problem Solving directly translates to faster debugging in React and Python.',
    tag: 'Strength',
  },
];

export const api = {
  // Fetch all skills
  async getSkills() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
      return INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  },

  // Update a skill level
  async updateSkillLevel(id, newLevel) {
    try {
      const skills = await this.getSkills();
      const updated = skills.map((s) => {
        if (s.id === id) {
          const level = Math.max(0, Math.min(100, Number(newLevel)));
          let status = 'Beginner';
          if (level >= 85) status = 'Expert';
          else if (level >= 75) status = 'Advanced';
          else if (level >= 60) status = 'Proficient';
          else if (level >= 40) status = 'Intermediate';
          return { ...s, level, status };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Add a new skill
  async addSkill(skillData) {
    try {
      const skills = await this.getSkills();
      const level = Math.max(0, Math.min(100, Number(skillData.level || 50)));
      let status = 'Intermediate';
      if (level >= 85) status = 'Expert';
      else if (level >= 75) status = 'Advanced';
      else if (level >= 60) status = 'Proficient';
      else if (level < 40) status = 'Beginner';

      const newSkill = {
        id: Date.now(),
        name: skillData.name || 'Untitled Skill',
        category: skillData.category || 'General',
        level,
        status,
      };
      const updated = [...skills, newSkill];
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Fetch all goals
  async getGoals() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(INITIAL_GOALS));
      return INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  },

  // Toggle goal completion
  async toggleGoal(id) {
    try {
      const goals = await this.getGoals();
      const updated = goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed, progress: !g.completed ? 100 : 50 } : g
      );
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Add goal
  async addGoal(goalData) {
    try {
      const goals = await this.getGoals();
      const newGoal = {
        id: Date.now(),
        title: goalData.title,
        category: goalData.category || 'General',
        dueDate: goalData.dueDate || new Date().toISOString().split('T')[0],
        completed: false,
        progress: 0,
      };
      const updated = [...goals, newGoal];
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Get insights
  async getInsights() {
    return INITIAL_INSIGHTS;
  },

  // Send message to Personal AI Companion
  async sendChatMessage(message, skills = [], goals = []) {
    // Generate thoughtful response grounded in current TwinMind state
    const lower = message.toLowerCase();
    
    if (lower.includes('internship') || lower.includes('ai-ml') || lower.includes('prepare')) {
      const pySkill = skills.find((s) => s.name.toLowerCase().includes('python'));
      const mlSkill = skills.find((s) => s.name.toLowerCase().includes('machine learning'));
      const pyLevel = pySkill ? pySkill.level : 80;
      const mlLevel = mlSkill ? mlSkill.level : 65;

      return {
        reply: `Based on your TwinMind profile, here is your customized plan to prepare for an AI-ML internship:

1. **Leverage your Python strength (${pyLevel}/100)**: Build an end-to-end FastAPI deployment that serves a predictive PyTorch model.
2. **Elevate your Machine Learning (${mlLevel}/100)**: Focus heavily on model evaluation metrics (Precision, Recall, ROC-AUC) and data preprocessing pipelines.
3. **Goal alignment**: You currently have "${goals[1]?.title || 'Build PyTorch neural network'}" in progress. Finishing this will give you a showcase project for your portfolio.
4. **Suggested next skill**: Add "Transformers & LLMs" to your skills inventory!`,
      };
    }

    if (lower.includes('skill') || lower.includes('level') || lower.includes('improve')) {
      return {
        reply: `Looking at your skills matrix:
- Highest strength: **${skills[0]?.name || 'Python'}** at **${skills[0]?.level || 80}/100**.
- Highest opportunity for growth: **${skills[skills.length - 1]?.name || 'Cloud Deployment'}** at **${skills[skills.length - 1]?.level || 60}/100**.

Would you like me to generate a 3-week study roadmap to bring your lowest skill up to 75%?`,
      };
    }

    if (lower.includes('goal') || lower.includes('target')) {
      const pending = goals.filter((g) => !g.completed);
      return {
        reply: `You have ${pending.length} active learning goals. Next upcoming milestone: "${pending[0]?.title || 'Complete current module'}" due on ${pending[0]?.dueDate || 'soon'}. Breaking this into 30-minute daily sprints will keep your momentum high!`,
      };
    }

    return {
      reply: `I am your TwinMind companion! I monitor your skills, track your learning goals, and simulate career growth paths.

Try asking:
- "What should I learn next to prepare for an AI-ML internship?"
- "Which skill should I prioritize this week?"
- "How can I balance my frontend and AI goals?"`,
    };
  },
};

export default api;
