import { motion } from 'framer-motion';
import { getWPMLabel } from '../utils/gameUtils';

const StatCard = ({ icon, value, label, color, delay = 0, suffix = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative p-5 rounded-lg overflow-hidden group"
    style={{
      background: '#111820',
      border: '1px solid rgba(41, 50, 65, 0.9)',
      boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
    }}
    whileHover={{ y: -2 }}
  >
    <div
      className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
    <div className="text-xs uppercase tracking-[0.12em] text-secondary mb-3">{icon}</div>
    <div className="text-2xl font-display font-semibold" style={{ color }}>
      {value}{suffix}
    </div>
    <div className="text-xs text-secondary font-body mt-0.5">{label}</div>
  </motion.div>
);

const XPProgressBar = ({ currentXP, currentLevel, nextLevel, xpProgress }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="col-span-2 p-5 rounded-lg md:col-span-3"
    style={{
      background: '#111820',
      border: '1px solid rgba(41, 50, 65, 0.9)',
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="text-sm text-secondary font-body">Level {currentLevel.level}</div>
        <div className="text-base font-display font-bold text-white">{currentLevel.title}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-secondary font-body">{currentXP.toLocaleString()} XP</div>
        {nextLevel && (
          <div className="text-xs text-secondary font-body">Next: {nextLevel.xpRequired.toLocaleString()}</div>
        )}
      </div>
    </div>
    <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${currentLevel.color}, ${currentLevel.color}aa)` }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(xpProgress, 100)}%` }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />
    </div>
  </motion.div>
);

const DashboardCards = ({ stats, currentLevel, nextLevel, xpProgress }) => {
  const wpmLabel = getWPMLabel(stats.bestWPM);

  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-display font-bold text-white flex items-center gap-2"
      >
        Your stats
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard icon="Speed" value={stats.bestWPM} label="Best WPM" color={wpmLabel.color} delay={0} />
        <StatCard icon="Volume" value={stats.totalTests} label="Tests Taken" color="#7dd3fc" delay={0.05} />
        <StatCard icon="Streak" value={stats.currentStreak} label="Day Streak" color="#f59e0b" delay={0.1} suffix=" days" />
        <XPProgressBar
          currentXP={stats.totalXP}
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          xpProgress={xpProgress}
        />
      </div>
    </div>
  );
};

export default DashboardCards;
