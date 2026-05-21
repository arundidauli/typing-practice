import { motion } from 'framer-motion';
import { getWPMLabel, calcXPEarned } from '../utils/gameUtils';

const ResultScreen = ({ wpm, accuracy, mistakes, duration, onRetry, onNewTest }) => {
  const wpmLabel = getWPMLabel(wpm);
  const xpEarned = calcXPEarned(wpm, accuracy);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <div
          className="text-6xl font-display font-semibold mb-1"
          style={{ color: wpmLabel.color }}
        >
          {wpm}
        </div>
        <div className="text-base text-secondary font-body mb-3">words per minute</div>
        <div
          className="inline-block px-3 py-1 rounded-md text-sm font-display font-medium mb-6"
          style={{
            background: `${wpmLabel.color}22`,
            color: wpmLabel.color,
            border: `1px solid ${wpmLabel.color}44`,
          }}
        >
          {wpmLabel.label}
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <div className="text-2xl font-display font-bold" style={{ color: accuracy >= 95 ? '#10b981' : '#f59e0b' }}>
            {accuracy}%
          </div>
          <div className="text-xs text-secondary font-body">Accuracy</div>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-display font-bold" style={{ color: mistakes > 5 ? '#f43f5e' : '#10b981' }}>
            {mistakes}
          </div>
          <div className="text-xs text-secondary font-body">Mistakes</div>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-accent">
            +{xpEarned}
          </div>
          <div className="text-xs text-secondary font-body">XP earned</div>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-secondary">
            {duration}s
          </div>
          <div className="text-xs text-secondary font-body">Duration</div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={onRetry}
          className="px-6 py-3 rounded-md font-display font-semibold text-white"
          style={{
            background: '#2563eb',
          }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Try again
        </motion.button>
        <motion.button
          onClick={onNewTest}
          className="px-6 py-3 rounded-md font-display font-semibold"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#e2e8f0',
          }}
          whileHover={{ y: -1, background: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.97 }}
        >
          New words
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
