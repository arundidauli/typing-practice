import { motion } from 'framer-motion';
import { achievements } from '../data/wordBanks';

const AchievementBadge = ({ achievement, unlocked, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-start gap-1.5 p-3 rounded-lg text-left group"
    style={{
      background: unlocked ? 'rgba(20, 184, 166, 0.1)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${unlocked ? 'rgba(20, 184, 166, 0.28)' : 'rgba(255,255,255,0.06)'}`,
      opacity: unlocked ? 1 : 0.4,
    }}
    title={achievement.desc}
    whileHover={unlocked ? { y: -2 } : {}}
  >
    <div className="text-xs font-display font-semibold" style={{ color: unlocked ? '#99f6e4' : '#4b5563' }}>
      {achievement.label}
    </div>
    {unlocked && (
      <div className="text-xs font-body" style={{ color: '#6b7280' }}>+{achievement.xp} XP</div>
    )}
  </motion.div>
);

const AchievementsPanel = ({ unlockedIds }) => {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-display font-bold text-white flex items-center gap-2"
      >
        Achievements
        <span className="text-sm font-body text-secondary font-normal">
          {unlockedIds.length}/{achievements.length}
        </span>
      </motion.h2>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {achievements.map((ach, i) => (
          <AchievementBadge
            key={ach.id}
            achievement={ach}
            unlocked={unlockedIds.includes(ach.id)}
            delay={i * 0.04}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPanel;
