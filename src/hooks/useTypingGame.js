import { useState, useEffect, useCallback, useRef } from 'react';
import { getWordList, motivationalMessages } from '../data/wordBanks';

export const useTypingGame = ({ duration, difficulty, category, onComplete }) => {
  const [text, setText] = useState(() => {
    const initialText = getWordList(difficulty, category);
    return `${initialText} ${getWordList(difficulty, category)}`;
  });
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [pressedKey, setPressedKey] = useState('');

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const totalTypedRef = useRef(0);
  const mistakesRef = useRef(0);
  const correctCharsRef = useRef(0);
  const finishedRef = useRef(false);

  const createText = useCallback(() => {
    const newText = getWordList(difficulty, category);
    return `${newText} ${getWordList(difficulty, category)}`;
  }, [difficulty, category]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(duration);
    setInput('');
    setStarted(false);
    setFinished(false);
    finishedRef.current = false;
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setCorrectChars(0);
    totalTypedRef.current = 0;
    mistakesRef.current = 0;
    correctCharsRef.current = 0;
    startTimeRef.current = null;
    clearInterval(intervalRef.current);
    setText(createText());
    return () => clearInterval(intervalRef.current);
  }, [duration, difficulty, category, createText]);

  const calcWPM = useCallback((chars, elapsed) => {
    if (elapsed <= 0) return 0;
    return Math.round((chars / 5) / (elapsed / 60));
  }, []);

  const handleKeyDown = useCallback((e) => {
    setPressedKey(e.key);
    setTimeout(() => setPressedKey(''), 150);
  }, []);

  const handleInput = useCallback((e) => {
    const val = e.target.value;
    if (finishedRef.current || finished) return;

    if (!started && val.length > 0) {
      setStarted(true);
      startTimeRef.current = Date.now();
      finishedRef.current = false;

      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = duration - elapsed;

        if (remaining <= 0) {
          clearInterval(intervalRef.current);
          if (finishedRef.current) return;
          finishedRef.current = true;
          setTimeLeft(0);
          setFinished(true);
          const finalWPM = calcWPM(correctCharsRef.current, duration);
          const finalAcc = totalTypedRef.current > 0
            ? Math.round(((totalTypedRef.current - mistakesRef.current) / totalTypedRef.current) * 100)
            : 100;
          if (onComplete) onComplete({ wpm: finalWPM, accuracy: finalAcc, mistakes: mistakesRef.current });
        } else {
          setTimeLeft(Math.ceil(remaining));
          const currentWPM = calcWPM(correctCharsRef.current, elapsed);
          setWpm(currentWPM);

          // Motivational messages at intervals
          if (Math.floor(elapsed) % 10 === 0 && elapsed > 5) {
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            setTimeout(() => setCurrentMessage(''), 2500);
          }
        }
      }, 100);
    }

    const newInput = val;
    let correct = 0;
    let newMistakes = 0;

    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] === text[i]) correct++;
      else newMistakes++;
    }

    totalTypedRef.current = newInput.length;
    mistakesRef.current = newMistakes;
    correctCharsRef.current = correct;

    setInput(newInput);
    setCorrectChars(correct);
    setMistakes(newMistakes);

    const acc = newInput.length > 0
      ? Math.round((correct / newInput.length) * 100)
      : 100;
    setAccuracy(acc);

    if (started && startTimeRef.current) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed > 0) setWpm(calcWPM(correct, elapsed));
    }

    // Auto scroll / extend text if running low
    if (newInput.length > text.length - 100) {
      // Pass current difficulty and category to ensure extension matches settings
      setText(prev => {
        const extension = getWordList(difficulty, category);
        // Avoid adding the exact same string twice if possible
        if (prev.endsWith(extension)) {
          return prev + ' ' + getWordList(difficulty, category);
        }
        return prev + ' ' + extension;
      });
    }
  }, [started, finished, text, duration, calcWPM, onComplete, difficulty, category]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setInput('');
    setStarted(false);
    setFinished(false);
    finishedRef.current = false;
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setCorrectChars(0);
    setCurrentMessage('');
    totalTypedRef.current = 0;
    mistakesRef.current = 0;
    correctCharsRef.current = 0;
    startTimeRef.current = null;
    setText(createText());
  }, [duration, createText]);

  return {
    text,
    input,
    started,
    finished,
    timeLeft,
    wpm,
    accuracy,
    mistakes,
    correctChars,
    currentMessage,
    pressedKey,
    handleInput,
    handleKeyDown,
    reset,
  };
};
