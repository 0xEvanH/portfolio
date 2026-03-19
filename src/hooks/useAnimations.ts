import { useEffect, useRef, useState } from "react";
import { SCRAMBLE_CHARS } from "../constants";

export function useScramble(targetText: string, triggered: boolean, intervalMs = 38): string {
  const [displayText, setDisplayText] = useState(() =>
    targetText.replace(/\S/g, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]),
  );
  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolvedUpTo    = useRef(0);

  useEffect(() => {
    if (!triggered) return;
    resolvedUpTo.current = 0;

    intervalRef.current = setInterval(() => {
      const resolved = resolvedUpTo.current;
      setDisplayText(
        targetText.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join(""),
      );
      if (resolved < targetText.length) resolvedUpTo.current += 1;
      else if (intervalRef.current) clearInterval(intervalRef.current);
    }, intervalMs);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [triggered, targetText, intervalMs]);

  return displayText;
}

export function useCountUp(targetNumber: number, triggered: boolean, durationMs = 1100): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * targetNumber));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, targetNumber, durationMs]);

  return count;
}
