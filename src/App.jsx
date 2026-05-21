import { useCallback, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TypingArea from './components/TypingArea';
import DashboardCards from './components/DashboardCards';
import AchievementsPanel from './components/AchievementsPanel';
import KeyboardHeatmap from './components/KeyboardHeatmap';
import LoadingScreen from './components/LoadingScreen';
import { useStats } from './hooks/useStats';
import { soundEngine } from './utils/gameUtils';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentPressedKey, setCurrentPressedKey] = useState('');
  const gameRef = useRef(null);

  const { stats, currentLevel, nextLevel, xpProgress, recordResult } = useStats();

  const scrollToGame = () => {
    gameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
  };

  const handleResult = (result) => {
    recordResult(result);
  };

  const handlePressedKey = useCallback((key) => {
    setCurrentPressedKey(key);
  }, []);

  return (
    <div className="min-h-screen font-body" style={{ background: '#0b0f14', color: '#e5e7eb' }}>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ParticleBackground />

          <Header
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onScrollToGame={scrollToGame}
          />

          <HeroSection onStartTyping={scrollToGame} />

          <section ref={gameRef} className="relative z-10 py-16">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-2">
                  Practice session
                </h2>
                <p className="text-secondary font-body max-w-2xl">
                  Choose a duration and content type. The timer starts on your first keystroke.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <TypingArea
                  onResult={handleResult}
                  soundEnabled={soundEnabled}
                  onPressedKey={handlePressedKey}
                />
              </motion.div>
            </div>
          </section>

          <section className="relative z-10 py-8 pb-16">
            <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <DashboardCards
                  stats={stats}
                  currentLevel={currentLevel}
                  nextLevel={nextLevel}
                  xpProgress={xpProgress}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <KeyboardHeatmap pressedKey={currentPressedKey} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AchievementsPanel unlockedIds={stats.achievements || []} />
              </motion.div>
            </div>
          </section>

          <footer
            className="relative z-10 py-8 text-center border-t"
            style={{ borderColor: 'rgba(41,50,65,0.8)' }}
          >
            <p className="text-secondary font-body text-sm">
              Typing Master · Practice, measure, improve
            </p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
