import { type CSSProperties, type FC, useEffect, useState } from "react";

export const Background: FC = () => (
  <div className="fixed inset-0 z-0 bg-black pointer-events-none">
    <div
      className="absolute rounded-full"
      style={{
        top: "-20vh", right: "-15vw",
        width: "65vw", height: "65vw",
        background: "radial-gradient(circle, rgba(80,80,80,0.18) 0%, rgba(40,40,40,0.08) 45%, transparent 70%)",
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        bottom: "-15vh", left: "-10vw",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(60,60,60,0.14) 0%, rgba(30,30,30,0.06) 50%, transparent 72%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
        animation: "grainShift 0.5s steps(1) infinite",
      }}
    />
  </div>
);

export const Intro: FC<{ onDone: () => void }> = ({ onDone }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase(1), 1100);
    const doneTimer = setTimeout(() => { setPhase(2); onDone(); }, 2350);
    return () => { clearTimeout(showTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  if (phase === 2) return null;

  const curtainStyle = (side: "left" | "right"): CSSProperties => ({
    position: "absolute", top: 0, [side]: 0,
    width: "50%", height: "100%", background: "#080808",
    transform: phase === 1 ? `translateX(${side === "left" ? "-100%" : "100%"})` : "translateX(0)",
    transition: "transform 1.15s cubic-bezier(0.87, 0, 0.13, 1) 0.06s",
  });

  return (
    <div
      className="fixed inset-0 z-9999"
      style={{ pointerEvents: phase === 1 ? "none" : "all" }}
    >
      <div style={curtainStyle("left")} />
      <div style={curtainStyle("right")} />

      <div
        className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none"
        style={{
          opacity: phase === 1 ? 0 : 1,
          transform: phase === 1 ? "scale(0.72)" : "scale(1)",
          transition: "opacity 0.42s ease 0.04s, transform 0.5s cubic-bezier(0.87,0,0.13,1) 0.04s",
        }}
      >
        <div className="relative flex flex-col items-center gap-[1.2rem]">
          <div className="flex items-baseline gap-[0.04em]">
            {"evan h.".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block select-none leading-none"
                style={{
                  fontWeight: char === "." ? 300 : 900,
                  fontSize: char === " " ? "0.3em" : "clamp(2.8rem, 8vw, 5.5rem)",
                  letterSpacing: "-0.05em",
                  color: char === "." ? "rgba(255,255,255,0.45)" : "#ffffff",
                  whiteSpace: char === " " ? "pre" : undefined,
                  animation: `introLift 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.06 + 0.1}s both`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <div
            className="uppercase whitespace-nowrap"
            style={{
              fontWeight: 400,
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.28)",
              animation: "introLift 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
            }}
          >
            Portfolio - 2026
          </div>
        </div>
      </div>
    </div>
  );
};
