import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingGame } from '../hooks/useTypingGame';
import { timerOptions, difficultyLevels, contentCategories } from '../data/wordBanks';
import ResultScreen from './ResultScreen';
import { triggerConfetti, soundEngine } from '../utils/gameUtils';

const LiveStat = ({ value, label, color }) => (
  <div className="min-w-16 text-left sm:text-center">
    <div className="text-xl md:text-2xl font-display font-semibold leading-none" style={{ color }}>
      {value}
    </div>
    <div className="text-xs text-secondary font-body mt-1">{label}</div>
  </div>
);

const TimerRing = ({ timeLeft, duration }) => {
  const progress = timeLeft / duration;
  const size = 72;
  const r = 30;
  const circ = 2 * Math.PI * r;
  const stroke = circ * (1 - progress);
  const color = progress > 0.5 ? '#4f8cff' : progress > 0.25 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={stroke}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-display font-semibold" style={{ color }}>{timeLeft}</div>
      </div>
    </div>
  );
};

const TypingDisplay = ({ text, input }) => {
  const containerRef = useRef(null);
  const activeCharRef = useRef(null);
  const tokens = useMemo(() => {
    return Array.from(text.matchAll(/\S+\s*/g), (match) => ({
      token: match[0],
      start: match.index,
    }));
  }, [text]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeChar = activeCharRef.current;
    if (!container || !activeChar) return;

    const lineHeight = parseFloat(window.getComputedStyle(container).lineHeight) || 38;
    const targetScrollTop = Math.max(0, activeChar.offsetTop - lineHeight * 1.5);

    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  }, [input.length]);

  return (
    <div
      ref={containerRef}
      className="typing-scroll relative font-mono text-lg md:text-xl select-none overflow-y-auto rounded-md"
      style={{
        height: '10rem',
        lineHeight: '2.35rem',
        letterSpacing: 0,
        background: 'rgba(5, 9, 14, 0.36)',
        border: '1px solid rgba(41, 50, 65, 0.55)',
        padding: '1.25rem',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
      }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {tokens.map(({ token, start: wordStart }, tokenIndex) => {
          const chars = token.split('');

          return (
            <span key={`${token}-${tokenIndex}-${wordStart}`} className="inline-flex flex-nowrap">
              {chars.map((char, offset) => {
                const i = wordStart + offset;
                const isSpace = char === ' ';
                const isCurrent = i === input.length;
                const isTyped = i < input.length;
                const isCorrect = input[i] === char;
                let style = {};
                let className = 'relative inline-flex items-center justify-center transition-colors duration-75';

                if (isSpace) {
                  className += ' mx-0.5 min-w-[0.8em] rounded-sm';
                  style.color = isCurrent ? '#0b0f14' : 'rgba(156, 163, 175, 0.3)';
                  style.background = isCurrent
                    ? '#7dd3fc'
                    : isTyped
                      ? isCorrect ? 'rgba(16, 185, 129, 0.18)' : 'rgba(244, 63, 94, 0.18)'
                      : 'rgba(255,255,255,0.04)';
                  style.outline = isTyped && !isCorrect ? '1px solid rgba(244, 63, 94, 0.5)' : 'none';
                } else if (isTyped) {
                  style.color = isCorrect ? '#34d399' : '#fb7185';
                  style.textDecoration = isCorrect ? 'none' : 'underline';
                  style.textDecorationColor = '#fb718588';
                } else if (isCurrent) {
                  style.color = '#f9fafb';
                  style.background = 'rgba(125, 211, 252, 0.16)';
                  style.borderRadius = '3px';
                } else {
                  style.color = 'rgba(156, 163, 175, 0.48)';
                }

                return (
                  <span
                    key={i}
                    ref={isCurrent ? activeCharRef : null}
                    className={className}
                    style={style}
                  >
                    {isCurrent && (
                      <span
                        className="absolute -left-px top-[0.35em] w-0.5 h-[1.35em] rounded-full animate-cursor-blink"
                        style={{ background: '#7dd3fc' }}
                      />
                    )}
                    {isSpace ? '·' : char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const TypingArea = ({ onResult, soundEnabled, onPressedKey }) => {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [category, setCategory] = useState('tech');
  const [testKey, setTestKey] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const inputRef = useRef(null);

  const handleComplete = (result) => {
    setLastResult(result);
    setShowResult(true);
    if (result.wpm >= 60) triggerConfetti(result.wpm >= 100 ? 'legendary' : 'high');
    else triggerConfetti('normal');
    if (onResult) onResult(result);
    soundEngine.playSuccess();
  };

  const {
    text, input, started, finished, timeLeft, wpm, accuracy, mistakes,
    currentMessage, pressedKey, handleInput, handleKeyDown, reset,
  } = useTypingGame({ duration: selectedDuration, difficulty, category, onComplete: handleComplete });

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    focusInput();
  }, [testKey]);

  useEffect(() => {
    onPressedKey?.(pressedKey);
  }, [pressedKey, onPressedKey]);

  const handleTypingInput = (e) => {
    const nextValue = e.target.value;
    if (soundEnabled && nextValue.length > input.length) {
      const charIndex = nextValue.length - 1;
      soundEngine.playKey(nextValue[charIndex] === text[charIndex]);
    }
    handleInput(e);
  };

  const handleTypingKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleRetry();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleRetry();
      return;
    }
    handleKeyDown(e);
  };

  const handleRetry = () => {
    setShowResult(false);
    reset();
    setTimeout(focusInput, 100);
  };

  const handleNewTest = () => {
    setShowResult(false);
    reset();
    setTestKey(k => k + 1);
    setTimeout(focusInput, 100);
  };

  return (
    <div className="space-y-6">
      <div
        className="grid gap-5 rounded-lg p-4 md:grid-cols-[auto_auto_1fr]"
        style={{
          background: 'rgba(17, 24, 32, 0.72)',
          border: '1px solid rgba(41, 50, 65, 0.78)',
        }}
      >
        <div className="space-y-2">
          <div className="text-xs text-secondary font-body uppercase tracking-[0.12em]">Timer</div>
          <div className="grid grid-cols-4 gap-2">
            {timerOptions.map(t => (
              <button
                key={t}
                onClick={() => { setSelectedDuration(t); handleRetry(); }}
                className="px-3 py-2 rounded-md text-sm font-display font-medium transition-all duration-200 hover:border-slate-500"
                style={{
                  background: selectedDuration === t ? 'rgba(79,140,255,0.18)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${selectedDuration === t ? 'rgba(79,140,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  color: selectedDuration === t ? '#bfdbfe' : '#9ca3af',
                }}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-secondary font-body uppercase tracking-[0.12em]">Difficulty</div>
          <div className="flex gap-2 flex-wrap">
            {difficultyLevels.map(d => (
              <button
                key={d.id}
                onClick={() => { setDifficulty(d.id); handleRetry(); }}
                className="px-3 py-2 rounded-md text-sm font-display font-medium transition-all duration-200 hover:border-slate-500"
                style={{
                  background: difficulty === d.id ? `${d.color}22` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${difficulty === d.id ? `${d.color}55` : 'rgba(255,255,255,0.1)'}`,
                  color: difficulty === d.id ? d.color : '#9ca3af',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-secondary font-body uppercase tracking-[0.12em]">Content</div>
          <div className="flex gap-2 flex-wrap">
            {contentCategories.map(c => (
              <button
                key={c.id}
                onClick={() => { setCategory(c.id); handleRetry(); }}
                className="px-3 py-2 rounded-md text-sm font-display font-medium transition-all duration-200 hover:border-slate-500"
                style={{
                  background: category === c.id ? 'rgba(20,184,166,0.14)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${category === c.id ? 'rgba(20,184,166,0.42)' : 'rgba(255,255,255,0.1)'}`,
                  color: category === c.id ? '#99f6e4' : '#9ca3af',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main game panel */}
      <motion.div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: '#111820',
          border: '1px solid rgba(41, 50, 65, 0.95)',
          boxShadow: '0 18px 44px rgba(0,0,0,0.28)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.45), rgba(20,184,166,0.35), transparent)' }}
        />

        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-10"
            >
              <ResultScreen
                wpm={lastResult?.wpm || 0}
                accuracy={lastResult?.accuracy || 100}
                mistakes={lastResult?.mistakes || 0}
                duration={selectedDuration}
                onRetry={handleRetry}
                onNewTest={handleNewTest}
              />
            </motion.div>
          ) : (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col gap-4 px-5 py-4 border-b sm:flex-row sm:items-center sm:justify-between md:px-6" style={{ borderColor: 'rgba(41,50,65,0.9)' }}>
                <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-6 sm:items-center">
                  <LiveStat value={wpm} label="WPM" color="#7dd3fc" />
                  <div className="hidden sm:block w-px h-8 bg-border" />
                  <LiveStat value={`${accuracy}%`} label="Accuracy" color={accuracy >= 95 ? '#10b981' : '#f59e0b'} />
                  <div className="hidden sm:block w-px h-8 bg-border" />
                  <LiveStat value={mistakes} label="Mistakes" color={mistakes > 5 ? '#f43f5e' : '#6b7280'} />
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <TimerRing timeLeft={timeLeft} duration={selectedDuration} />
                  <button
                    onClick={handleRetry}
                    className="px-3 py-2 rounded-md text-sm text-secondary hover:text-primary transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    title="Restart (Tab)"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Typing area */}
              <div
                className="px-4 py-6 cursor-text min-h-[180px] md:px-8"
                onClick={focusInput}
              >
                {!started && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-body"
                      style={{
                        background: 'rgba(79,140,255,0.1)',
                        border: '1px solid rgba(79,140,255,0.28)',
                        color: '#bfdbfe',
                      }}
                    >
                      Start typing to begin the timer
                    </div>
                  </motion.div>
                )}

                <TypingDisplay text={text} input={input} />

                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleTypingInput}
                  onKeyDown={handleTypingKeyDown}
                  disabled={finished}
                  className="absolute opacity-0 w-px h-px"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-label="Typing input"
                />
              </div>

              {/* Motivational message */}
              <AnimatePresence>
                {currentMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-6 pb-4 text-center"
                  >
                    <span
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-display font-bold"
                      style={{
                        background: 'rgba(20,184,166,0.12)',
                        color: '#99f6e4',
                        border: '1px solid rgba(20,184,166,0.3)',
                      }}
                    >
                      {currentMessage}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Helper text */}
      {!showResult && (
        <p className="text-xs text-center text-secondary font-body opacity-60">
          Focus stays in the typing area. Use Tab or Esc to restart.
        </p>
      )}
    </div>
  );
};

export default TypingArea;
