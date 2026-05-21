import { useCallback } from 'react';
import { useLocalStorage, defaultStats } from './useLocalStorage';
import { achievements, levels } from '../data/wordBanks';

export const useStats = () => {
  const [stats, setStats] = useLocalStorage('typingmaster_stats', defaultStats);

  const getCurrentLevel = useCallback((xp) => {
    let currentLevel = levels[0];
    for (const lvl of levels) {
      if (xp >= lvl.xpRequired) currentLevel = lvl;
    }
    return currentLevel;
  }, []);

  const getNextLevel = useCallback((xp) => {
    for (let i = 0; i < levels.length; i++) {
      if (xp < levels[i].xpRequired) return levels[i];
    }
    return null;
  }, []);

  const checkAchievements = useCallback((result, currentStats) => {
    const newAchievements = [...(currentStats.achievements || [])];
    const unlocked = [];

    const check = (id) => !newAchievements.includes(id);

    if (check('first_test') && currentStats.totalTests >= 1) {
      newAchievements.push('first_test');
      unlocked.push(achievements.find(a => a.id === 'first_test'));
    }
    if (check('speed_30') && result.wpm >= 30) {
      newAchievements.push('speed_30');
      unlocked.push(achievements.find(a => a.id === 'speed_30'));
    }
    if (check('speed_60') && result.wpm >= 60) {
      newAchievements.push('speed_60');
      unlocked.push(achievements.find(a => a.id === 'speed_60'));
    }
    if (check('speed_100') && result.wpm >= 100) {
      newAchievements.push('speed_100');
      unlocked.push(achievements.find(a => a.id === 'speed_100'));
    }
    if (check('accuracy_95') && result.accuracy >= 95) {
      newAchievements.push('accuracy_95');
      unlocked.push(achievements.find(a => a.id === 'accuracy_95'));
    }
    if (check('accuracy_100') && result.accuracy === 100) {
      newAchievements.push('accuracy_100');
      unlocked.push(achievements.find(a => a.id === 'accuracy_100'));
    }
    if (check('streak_3') && currentStats.currentStreak >= 3) {
      newAchievements.push('streak_3');
      unlocked.push(achievements.find(a => a.id === 'streak_3'));
    }
    if (check('streak_7') && currentStats.currentStreak >= 7) {
      newAchievements.push('streak_7');
      unlocked.push(achievements.find(a => a.id === 'streak_7'));
    }
    if (check('tests_10') && currentStats.totalTests >= 10) {
      newAchievements.push('tests_10');
      unlocked.push(achievements.find(a => a.id === 'tests_10'));
    }
    if (check('tests_50') && currentStats.totalTests >= 50) {
      newAchievements.push('tests_50');
      unlocked.push(achievements.find(a => a.id === 'tests_50'));
    }

    return { newAchievements, unlocked: unlocked.filter(Boolean) };
  }, []);

  const recordResult = useCallback((result) => {
    setStats(prev => {
      const today = new Date().toDateString();
      const lastPlayed = prev.lastPlayed;
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = prev.currentStreak || 0;
      if (lastPlayed === today) {
        // same day, keep streak
      } else if (lastPlayed === yesterday) {
        newStreak += 1;
      } else if (lastPlayed !== today) {
        newStreak = 1;
      }

      // XP: 10 per correct char, 20 per WPM above 30, 50 for accuracy 95+
      const baseXP = Math.floor(result.wpm * 2) + (result.accuracy >= 95 ? 50 : 0) + 20;
      const newXP = (prev.totalXP || 0) + baseXP;
      const newLevel = getCurrentLevel(newXP);

      const updatedStats = {
        ...prev,
        bestWPM: Math.max(prev.bestWPM || 0, result.wpm),
        totalTests: (prev.totalTests || 0) + 1,
        totalXP: newXP,
        currentStreak: newStreak,
        lastPlayed: today,
        level: newLevel.level,
        history: [result, ...(prev.history || [])].slice(0, 50),
      };

      const { newAchievements } = checkAchievements(result, updatedStats);
      updatedStats.achievements = newAchievements;

      return updatedStats;
    });
  }, [setStats, getCurrentLevel, checkAchievements]);

  const resetStats = useCallback(() => {
    setStats(defaultStats);
  }, [setStats]);

  const currentLevel = getCurrentLevel(stats.totalXP || 0);
  const nextLevel = getNextLevel(stats.totalXP || 0);
  const xpProgress = nextLevel
    ? ((stats.totalXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  return {
    stats,
    currentLevel,
    nextLevel,
    xpProgress,
    recordResult,
    resetStats,
    checkAchievements,
  };
};
