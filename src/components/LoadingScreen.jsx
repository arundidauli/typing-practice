import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Preparing session...',
  'Loading word banks...',
  'Checking progress data...',
  'Ready',
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Warming up fingers...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 25 + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, 300);

    const msgInterval = setInterval(() => {
      setMessage(prev => {
        const i = messages.indexOf(prev);
        return messages[Math.min(i + 1, messages.length - 1)];
      });
    }, 500);

    return () => { clearInterval(interval); clearInterval(msgInterval); };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#06060f' }}
    >
      <div className="text-center max-w-md mx-auto px-8">
        {/* Logo */}
        <motion.div
          className="text-4xl font-display font-semibold mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #e5e7eb, #7dd3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Typing Master
          </span>
        </motion.div>

        <p className="text-secondary font-body mb-10 text-sm">{message}</p>

        {/* Progress bar */}
        <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2563eb, #14b8a6)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-xs text-secondary font-body mt-3 opacity-50">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
