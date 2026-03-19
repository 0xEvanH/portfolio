import { useCallback, useEffect, useRef } from "react";
import { SECTION_IDS, SCROLL_DURATION_MS } from "../constants";

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function getActiveSectionIndex(): number {
  return SECTION_IDS.findIndex((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top >= -10 && rect.top < window.innerHeight / 2;
  });
}

export function useScrollTween(
  _active: number,
  setActive: (i: number) => void,
) {
  const isScrolling  = useRef(false);
  const scrollStartY = useRef(0);
  const scrollEndY   = useRef(0);
  const scrollStartTime = useRef(0);
  const rafId        = useRef<number>(0);

  const scrollToSection = useCallback((targetIndex: number) => {
    if (isScrolling.current) return;
    if (targetIndex < 0 || targetIndex >= SECTION_IDS.length) return;
    const targetEl = document.getElementById(SECTION_IDS[targetIndex]);
    if (!targetEl) return;

    scrollStartY.current    = window.scrollY;
    scrollEndY.current      = targetEl.getBoundingClientRect().top + window.scrollY;
    scrollStartTime.current = performance.now();
    isScrolling.current     = true;
    setActive(targetIndex);

    const tick = (now: number) => {
      const elapsed  = now - scrollStartTime.current;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      window.scrollTo(0, scrollStartY.current + (scrollEndY.current - scrollStartY.current) * easeInOutCubic(progress));
      if (progress < 1) rafId.current = requestAnimationFrame(tick);
      else isScrolling.current = false;
    };
    rafId.current = requestAnimationFrame(tick);
  }, [setActive]);

  useEffect(() => {
    let accumulatedDelta = 0;
    let resetTimer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      accumulatedDelta += e.deltaY;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { accumulatedDelta = 0; }, 150);
      if (Math.abs(accumulatedDelta) > 40) {
        accumulatedDelta = 0;
        const currentIndex = getActiveSectionIndex();
        scrollToSection((currentIndex === -1 ? 0 : currentIndex) + (e.deltaY > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [scrollToSection]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      const currentIndex = getActiveSectionIndex();
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollToSection(safeIndex + 1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); scrollToSection(safeIndex - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollToSection]);

  useEffect(() => {
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const swipeDelta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(swipeDelta) < 30) return;
      const currentIndex = getActiveSectionIndex();
      scrollToSection((currentIndex === -1 ? 0 : currentIndex) + (swipeDelta > 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [scrollToSection]);

  return scrollToSection;
}
