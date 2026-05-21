import { motion } from 'framer-motion';

const Header = ({ soundEnabled, onToggleSound, onScrollToGame }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(11, 15, 20, 0.86)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(41, 50, 65, 0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-display font-bold"
            style={{ background: '#17202b', border: '1px solid #334155', color: '#7dd3fc' }}
          >
            TM
          </div>
          <span className="font-display font-semibold text-white hidden sm:block">
            Typing Master
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-body">
          {['Practice', 'Stats', 'Achievements'].map(item => (
            <button
              key={item}
              onClick={onScrollToGame}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={onToggleSound}
            className="px-3 py-2 rounded-md text-sm transition-all duration-200"
            style={{
              background: soundEnabled ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${soundEnabled ? 'rgba(20,184,166,0.36)' : 'rgba(255,255,255,0.1)'}`,
              color: soundEnabled ? '#5eead4' : '#9ca3af',
            }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? 'Sound on' : 'Sound off'}
          </motion.button>

          <motion.button
            onClick={onScrollToGame}
            className="px-4 py-2 rounded-md text-sm font-display font-semibold text-white"
            style={{ background: '#2563eb' }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
