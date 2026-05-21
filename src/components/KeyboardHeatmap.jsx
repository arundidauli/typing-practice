import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const KEY_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

const FINGER_COLORS = {
  // Left pinky
  '`': '#f43f5e', '1': '#f43f5e', 'q': '#f43f5e', 'a': '#f43f5e', 'z': '#f43f5e',
  // Left ring
  '2': '#f97316', 'w': '#f97316', 's': '#f97316', 'x': '#f97316',
  // Left middle
  '3': '#eab308', 'e': '#eab308', 'd': '#eab308', 'c': '#eab308',
  // Left index
  '4': '#22c55e', '5': '#22c55e', 'r': '#22c55e', 't': '#22c55e', 'f': '#22c55e', 'g': '#22c55e', 'v': '#22c55e', 'b': '#22c55e',
  // Right index
  '6': '#06b6d4', '7': '#06b6d4', 'y': '#06b6d4', 'u': '#06b6d4', 'h': '#06b6d4', 'j': '#06b6d4', 'n': '#06b6d4', 'm': '#06b6d4',
  // Right middle
  '8': '#3b82f6', 'i': '#3b82f6', 'k': '#3b82f6', ',': '#3b82f6',
  // Right ring
  '9': '#60a5fa', 'o': '#60a5fa', 'l': '#60a5fa', '.': '#60a5fa',
  // Right pinky
  '0': '#818cf8', '-': '#818cf8', '=': '#818cf8', 'p': '#818cf8', '[': '#818cf8', ']': '#818cf8', ';': '#818cf8', "'": '#818cf8', '/': '#818cf8',
};

const KeyboardHeatmap = ({ pressedKey }) => {
  const [heatMap, setHeatMap] = useState({});

  useEffect(() => {
    if (!pressedKey) return;
    const key = pressedKey.toLowerCase();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeatMap(prev => ({
      ...prev,
      [key]: Math.min((prev[key] || 0) + 0.3, 1),
    }));

    // Cool down over time
    const cooldown = setTimeout(() => {
      setHeatMap(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          next[k] = Math.max(0, next[k] - 0.05);
          if (next[k] <= 0) delete next[k];
        });
        return next;
      });
    }, 500);

    return () => clearTimeout(cooldown);
  }, [pressedKey]);

  return (
    <div className="space-y-3">
      <div className="text-xs text-secondary font-body uppercase tracking-widest flex items-center gap-2">
        Keyboard heat map
        <span className="opacity-50 normal-case tracking-normal">· colored by finger</span>
      </div>

      <div
        className="p-4 rounded-lg overflow-hidden"
        style={{
          background: '#111820',
          border: '1px solid rgba(41,50,65,0.9)',
        }}
      >
        <div className="flex flex-col gap-1.5 items-center scale-90 md:scale-100 origin-top">
          {KEY_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((key) => {
                const heat = heatMap[key] || 0;
                const fingerColor = FINGER_COLORS[key] || '#6b7280';
                const isPressed = pressedKey?.toLowerCase() === key;

                return (
                  <motion.div
                    key={key}
                    className="flex items-center justify-center rounded-md text-xs font-mono font-bold"
                    style={{
                      width: 32,
                      height: 32,
                      background: heat > 0
                        ? `${fingerColor}${Math.round(heat * 40 + 10).toString(16).padStart(2, '0')}`
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isPressed ? fingerColor : heat > 0.3 ? `${fingerColor}55` : 'rgba(255,255,255,0.08)'}`,
                      color: heat > 0.3 ? fingerColor : 'rgba(148,163,184,0.4)',
                      boxShadow: isPressed ? `0 0 10px ${fingerColor}88` : heat > 0.5 ? `0 0 5px ${fingerColor}44` : 'none',
                      transition: 'all 0.15s ease',
                    }}
                    animate={isPressed ? { scale: 0.88 } : { scale: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {key}
                  </motion.div>
                );
              })}
            </div>
          ))}

          {/* Spacebar */}
          <div className="flex gap-1 mt-0.5">
            <div
              className="flex items-center justify-center rounded-md text-xs font-mono"
              style={{
                width: 280,
                height: 28,
                background: pressedKey === ' ' ? 'rgba(79,140,255,0.22)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${pressedKey === ' ' ? 'rgba(125,211,252,0.55)' : 'rgba(255,255,255,0.08)'}`,
                color: 'rgba(148,163,184,0.3)',
                transition: 'all 0.1s ease',
              }}
            >
              space
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardHeatmap;
