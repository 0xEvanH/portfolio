import { type CSSProperties, type FC, useEffect, useRef, useState } from "react";
import { WHITE_DIM } from "../constants";
import { useScramble, useCountUp } from "../hooks/useAnimations";
import { projects, skills } from "../data";
import FlickerHeading from "./shared/FlickerHeading";

function lerp(from: number, to: number, speed: number) { return from + (to - from) * speed; }

const StatBlock: FC<{ value: number; label: string }> = ({ value, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="cursor-default">
      <div className="text-white leading-none" style={{ fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.04em", transform: isHovered ? "translateY(-4px) scale(1.04)" : "none", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        {value}
      </div>
      <div className="uppercase mt-[0.3rem]" style={{ fontWeight: 400, fontSize: "0.68rem", letterSpacing: isHovered ? "0.18em" : "0.1em", color: isHovered ? "#ffffff" : WHITE_DIM, transition: "letter-spacing 0.4s ease, color 0.3s ease" }}>
        {label}
      </div>
    </div>
  );
};

const Hero: FC<{ ready: boolean }> = ({ ready }) => {
  const [countingStarted, setCountingStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [rawCursor, setRawCursor] = useState({ x: 0.5, y: 0.5 });
  const smoothCursor = useRef({ x: 0.5, y: 0.5 });
  const cursorRafId = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setRawCursor({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const smoothStep = () => {
      smoothCursor.current.x = lerp(smoothCursor.current.x, rawCursor.x, 0.06);
      smoothCursor.current.y = lerp(smoothCursor.current.y, rawCursor.y, 0.06);
      cursorRafId.current = requestAnimationFrame(smoothStep);
    };
    cursorRafId.current = requestAnimationFrame(smoothStep);
    return () => cancelAnimationFrame(cursorRafId.current);
  }, [rawCursor]);

  useEffect(() => { if (ready) setTimeout(() => setCountingStarted(true), 600); }, [ready]);

  const nameText = useScramble("Evan Howard", ready, 38);
  const fieldText = useScramble("Student.", ready, 42);
  const projectCount = useCountUp(projects.length, countingStarted, 900);
  const skillCount = useCountUp(skills.length, countingStarted, 1100);
  const yearCount = useCountUp(2, countingStarted, 800);

  const entranceStyle = (delay: number): CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const parallaxX = (smoothCursor.current.x - 0.5) * 18;
  const parallaxY = (smoothCursor.current.y - 0.5) * 10;

  return (
    <section ref={sectionRef} id="home" className="section-pad relative z-1 min-h-screen flex flex-col justify-end pb-16 md:pb-20">
      <div className="uppercase mb-8" style={{ fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.14em", color: WHITE_DIM, ...entranceStyle(0.05) }}>
        E.H. Portfolio - 2026
      </div>

      <div style={{ ...entranceStyle(0.1), transform: `${ready ? "translateY(0)" : "translateY(28px)"} translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`, transition: "opacity 0.85s ease 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
        <FlickerHeading text={nameText} tag="h1" style={{ fontWeight: 900, fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "#ffffff", margin: "0 0 0.06em" }} />
      </div>

      <div style={{ ...entranceStyle(0.18), transform: `${ready ? "translateY(0)" : "translateY(28px)"} translate(${parallaxX * 0.65}px, ${parallaxY * 0.65}px)`, transition: "opacity 0.85s ease 0.18s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s" }}>
        <FlickerHeading text={fieldText} tag="h2" style={{ fontWeight: 900, fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.18)", margin: "0 0 3.5rem" }} />
      </div>

      <div className="flex gap-8 md:gap-14 mb-10" style={entranceStyle(0.55)}>
        <StatBlock value={projectCount} label="Projects" />
        <StatBlock value={skillCount} label="Skill Areas" />
        <StatBlock value={yearCount} label="Years Building" />
      </div>

      <p className="m-0 max-w-[44ch]" style={{ fontWeight: 400, fontSize: "clamp(0.85rem, 2vw, 0.95rem)", lineHeight: 1.75, color: WHITE_DIM, ...entranceStyle(0.65) }}>
        Building systems at the intersection of{" "}
        <strong style={{ fontWeight: 900, color: "rgba(255,255,255,0.7)" }}>3D, AI,</strong>
        {" "}or from <strong style={{ fontWeight: 900, color: "rgba(255,255,255,0.7)" }}>browser</strong> to <strong style={{ fontWeight: 900, color: "rgba(255,255,255,0.7)" }}>game engine</strong>.
      </p>
    </section>
  );
};

export default Hero;
