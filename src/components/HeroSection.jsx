import { motion } from 'framer-motion';

const HeroSection = ({ onStartTyping }) => {
  return (
    <section className="relative min-h-[72vh] flex items-end overflow-hidden pt-24 pb-14">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(79,140,255,0.12), transparent 34%), linear-gradient(180deg, #0b0f14 0%, #111820 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center px-3 py-1 rounded-md mb-6 text-xs font-medium uppercase tracking-[0.12em]"
            style={{
              background: 'rgba(125, 211, 252, 0.08)',
              border: '1px solid rgba(125, 211, 252, 0.22)',
              color: '#7dd3fc',
            }}
          >
            Focused typing practice
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold mb-5 leading-[1.02] text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Build typing speed with accurate feedback.
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-secondary font-body mb-8 max-w-2xl leading-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            Practice timed sessions, track accuracy, and review progress without distractions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <motion.button
              onClick={onStartTyping}
              className="px-5 py-3 rounded-md font-display font-semibold text-white"
              style={{ background: '#2563eb' }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Start session
            </motion.button>

            <motion.button
              className="px-5 py-3 rounded-md font-display font-semibold"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e5e7eb',
              }}
              whileHover={{ y: -1, background: 'rgba(255,255,255,0.07)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartTyping}
            >
              View practice panel
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
