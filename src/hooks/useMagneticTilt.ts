import { useCallback, useEffect, useRef, useState } from "react";

function lerp(from: number, to: number, speed: number) {
  return from + (to - from) * speed;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  lightX: number;
  lightY: number;
  isHovered: boolean;
}

export function useMagneticTilt(intensity = 12) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0, rotateY: 0, lightX: 50, lightY: 50, isHovered: false,
  });

  const targetTilt  = useRef({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  const currentTilt = useRef({ rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 });
  const rafId       = useRef<number>(0);
  const mouseIsOver = useRef(false);

  const animateTilt = useCallback(() => {
    const speed = mouseIsOver.current ? 0.12 : 0.08;
    currentTilt.current.rotateX = lerp(currentTilt.current.rotateX, targetTilt.current.rotateX, speed);
    currentTilt.current.rotateY = lerp(currentTilt.current.rotateY, targetTilt.current.rotateY, speed);
    currentTilt.current.lightX  = lerp(currentTilt.current.lightX,  targetTilt.current.lightX,  speed);
    currentTilt.current.lightY  = lerp(currentTilt.current.lightY,  targetTilt.current.lightY,  speed);

    setTilt({ ...currentTilt.current, isHovered: mouseIsOver.current });

    const stillMoving =
      Math.abs(currentTilt.current.rotateX - targetTilt.current.rotateX) > 0.01 ||
      Math.abs(currentTilt.current.rotateY - targetTilt.current.rotateY) > 0.01;

    if (stillMoving || mouseIsOver.current) rafId.current = requestAnimationFrame(animateTilt);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalX = (e.clientX - rect.left) / rect.width;
    const normalY = (e.clientY - rect.top)  / rect.height;
    targetTilt.current.rotateX = (normalY - 0.5) * -intensity;
    targetTilt.current.rotateY = (normalX - 0.5) *  intensity;
    targetTilt.current.lightX  = normalX * 100;
    targetTilt.current.lightY  = normalY * 100;
  }, [intensity]);

  const onMouseEnter = useCallback(() => {
    mouseIsOver.current = true;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animateTilt);
  }, [animateTilt]);

  const onMouseLeave = useCallback(() => {
    mouseIsOver.current = false;
    targetTilt.current = { rotateX: 0, rotateY: 0, lightX: 50, lightY: 50 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animateTilt);
  }, [animateTilt]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return { ref: cardRef, tilt, onMouseMove, onMouseEnter, onMouseLeave };
}
