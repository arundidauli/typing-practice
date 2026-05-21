export const wordBanks = {
  beginner: {
    fun: [
      'cat dog run jump play walk talk sing read look make have like time know people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us',
    ],
    words: 'the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump sphinx of black quartz judge my vow'.split(' '),
  },

  intermediate: {
    tech: [
      'algorithm', 'database', 'function', 'variable', 'interface', 'component', 'framework',
      'repository', 'deployment', 'container', 'terminal', 'keyboard', 'monitor', 'software',
      'hardware', 'network', 'protocol', 'server', 'browser', 'website', 'developer',
      'frontend', 'backend', 'fullstack', 'debugging', 'refactor', 'optimize', 'pipeline',
      'iteration', 'recursion', 'exception', 'callback', 'promise', 'async', 'module',
    ],
    motivational: [
      'Every keystroke', 'builds your speed', 'Practice makes', 'perfect results',
      'Focus your mind', 'and type with flow', 'Consistency beats', 'talent every time',
      'Small progress', 'daily adds up', 'Trust the process', 'and keep going',
    ],
  },

  pro: {
    tech: [
      'asynchronous programming paradigm', 'microservices architecture design', 'continuous integration pipeline',
      'polymorphism and encapsulation', 'distributed systems theory', 'machine learning gradient descent',
      'neural network backpropagation', 'functional reactive programming', 'dependency injection container',
      'event-driven architecture pattern', 'concurrent data structures', 'memory allocation strategy',
    ],
    quotes: [
      'The best way to predict the future is to create it',
      'Code is like humor when you have to explain it it is bad',
      'First solve the problem then write the code',
      'Simplicity is the soul of efficiency',
      'Make it work make it right make it fast',
      'Talk is cheap show me the code',
    ],
  },

  fun: {
    gaming: [
      'respawn point activated', 'legendary loot acquired', 'achievement unlocked boss defeated',
      'critical hit multiplied by three', 'stealth mode engaged silently',
      'power up collected maximum energy', 'combo streak extended brilliantly',
      'new high score obliterated previous record', 'final boss battle commencing now',
    ],
    funny: [
      'The coffee machine broke and everyone panicked',
      'My cat walked across the keyboard and wrote better code',
      'Autocorrect changed my presentation to a catastrophe',
      'I told a UDP joke but you might not get it',
      'There are only ten kinds of people in the world',
      'A SQL query walks into a bar and joins two tables',
      'Why do programmers prefer dark mode because light attracts bugs',
    ],
  },
};

export const getWordList = (difficulty, category) => {
  const bank = wordBanks[difficulty];
  if (!bank) return generateRandomWords(30);

  const content = bank[category] || Object.values(bank)[0];
  if (Array.isArray(content) && typeof content[0] === 'string' && content[0].includes(' ')) {
    const allWords = content.join(' ').split(' ').filter(w => w.length > 0);
    return shuffleArray(allWords).slice(0, 60).join(' ');
  }

  const words = Array.isArray(content) ? content : content[0].split(' ');
  return shuffleArray(words).slice(0, 40).join(' ');
};

export const generateRandomWords = (count = 40) => {
  const common = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not',
    'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from',
    'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
    'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which',
    'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
    'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
    'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well',
    'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most',
  ];
  return shuffleArray(common).slice(0, count).join(' ');
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const contentCategories = [
  { id: 'fun', label: 'Common words', description: 'Short everyday words' },
  { id: 'tech', label: 'Tech words', description: 'Code and technology' },
  { id: 'quotes', label: 'Quotes', description: 'Short phrases' },
  { id: 'gaming', label: 'Gaming', description: 'Game vocabulary' },
  { id: 'funny', label: 'Sentences', description: 'Longer sentence practice' },
];

export const difficultyLevels = [
  { id: 'beginner', label: 'Beginner', color: '#10b981', emoji: '', desc: 'Simple words' },
  { id: 'intermediate', label: 'Intermediate', color: '#f59e0b', emoji: '', desc: 'Common phrases' },
  { id: 'pro', label: 'Advanced', color: '#f43f5e', emoji: '', desc: 'Complex text' },
  { id: 'fun', label: 'Mixed', color: '#7dd3fc', emoji: '', desc: 'Varied prompts' },
];

export const timerOptions = [15, 30, 60, 120];

export const achievements = [
  { id: 'first_test', label: 'First session', desc: 'Complete your first test', emoji: '', xp: 50 },
  { id: 'speed_30', label: '30 WPM', desc: 'Reach 30 WPM', emoji: '', xp: 100 },
  { id: 'speed_60', label: '60 WPM', desc: 'Reach 60 WPM', emoji: '', xp: 250 },
  { id: 'speed_100', label: '100 WPM', desc: 'Reach 100 WPM', emoji: '', xp: 500 },
  { id: 'accuracy_95', label: '95% accuracy', desc: '95%+ accuracy', emoji: '', xp: 150 },
  { id: 'accuracy_100', label: 'Perfect accuracy', desc: '100% accuracy', emoji: '', xp: 300 },
  { id: 'streak_3', label: '3-day streak', desc: '3-day streak', emoji: '', xp: 200 },
  { id: 'streak_7', label: '7-day streak', desc: '7-day streak', emoji: '', xp: 500 },
  { id: 'tests_10', label: '10 sessions', desc: 'Complete 10 tests', emoji: '', xp: 100 },
  { id: 'tests_50', label: '50 sessions', desc: 'Complete 50 tests', emoji: '', xp: 300 },
];

export const levels = [
  { level: 1, title: 'Novice Typist', xpRequired: 0, color: '#6b7280' },
  { level: 2, title: 'Apprentice', xpRequired: 200, color: '#10b981' },
  { level: 3, title: 'Practitioner', xpRequired: 500, color: '#06b6d4' },
  { level: 4, title: 'Skilled Typer', xpRequired: 1000, color: '#3b82f6' },
  { level: 5, title: 'Expert Fingers', xpRequired: 2000, color: '#8b5cf6' },
  { level: 6, title: 'Speed Master', xpRequired: 3500, color: '#f59e0b' },
  { level: 7, title: 'Typing Legend', xpRequired: 5000, color: '#f43f5e' },
  { level: 8, title: 'Senior Typist', xpRequired: 7500, color: '#ec4899' },
  { level: 9, title: 'Principal Typist', xpRequired: 10000, color: '#7dd3fc' },
  { level: 10, title: 'Master Typist', xpRequired: 15000, color: '#fbbf24' },
];

export const motivationalMessages = [
  'Good pace. Keep accuracy steady.',
  'Stay relaxed and keep rhythm.',
  'Smooth input. Continue.',
  'Focus on the next word.',
  'Consistent timing.',
  'Accuracy first, speed follows.',
  'Strong rhythm.',
  'Keep the cursor moving.',
  'Good control.',
  'Finish clean.',
];
