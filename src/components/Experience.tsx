import { type FC, useState } from "react";
import { useMagneticTilt } from "../hooks/useMagneticTilt";
import { useReveal } from "../hooks/useReveal";
import ScrollRevealBlock from "./shared/ScrollRevealBlock";
import FlickerHeading from "./shared/FlickerHeading";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "internship" | "contract" | "full-time";
  accent: string;
  headline: string;
  bullets: string[];
  stack: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "EXP-01",
    role: "Software Developer Intern",
    company: "Sun Life Financial",
    period: "May 2024 — Aug 2024",
    type: "internship",
    accent: "#f5c518",
    headline: "Built a data tracking dashboard used across the analytics team.",
    bullets: [
      "Designed and shipped an internal data tracking dashboard in React + TypeScript, aggregating KPIs from multiple data sources into a single unified view.",
      "Integrated REST APIs and automated scheduled data pulls, reducing manual reporting time by ~60% across the analytics team.",
      "Collaborated with senior engineers to implement role-based access controls and audit logging for compliance with Sun Life's data governance policies.",
      "Delivered live demos to stakeholders and iterated on UX based on team feedback over a 4-month cycle.",
    ],
    stack: ["React", "TypeScript", "Python", "REST APIs", "SQL", "Figma"],
  },
  {
    id: "EXP-02",
    role: "QA Automation Intern",
    company: "Hedgey Finance",
    period: "Sep 2024 — Dec 2024",
    type: "internship",
    accent: "#5b8def",
    headline: "Automated end-to-end app testing for a Web3 token management platform.",
    bullets: [
      "Built a full automated testing suite using Playwright and Vitest covering critical user flows across the Hedgey token vesting and locking application.",
      "Reduced regression testing time from ~3 hours of manual QA to under 12 minutes per release cycle.",
      "Wrote reusable test utilities and mock wallet connectors to simulate on-chain interactions in a local test environment.",
      "Documented testing patterns and onboarded two other team members to the new automated pipeline.",
    ],
    stack: ["Playwright", "Vitest", "TypeScript", "Node.js", "Ethers.js", "GitHub Actions"],
  },
];

const ExperienceCard: FC<{ exp: ExperienceItem; cardIndex: number; sectionVisible: boolean }> = ({ exp, cardIndex, sectionVisible }) => {
  const { ref, tilt, onMouseMove, onMouseEnter, onMouseLeave } = useMagneticTilt(6);
  const [expanded, setExpanded] = useState(false);

  const cardTransform = `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.isHovered ? 1.015 : 1})`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => setExpanded(v => !v)}
      style={{
        position: "relative", borderRadius: "18px", overflow: "hidden", background: "#0d0d0d",
        border: tilt.isHovered ? "1px solid rgba(255,255,255,0.13)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: tilt.isHovered ? `0 24px 60px rgba(0,0,0,0.7), 0 0 40px -10px ${exp.accent}33` : "0 4px 24px rgba(0,0,0,0.4)",
        transform: cardTransform,
        transition: tilt.isHovered ? "border-color 0.3s ease, box-shadow 0.4s ease" : "transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.4s ease",
        cursor: "pointer", willChange: "transform",
        opacity: sectionVisible ? 1 : 0,
        ...(!sectionVisible ? { transition: `opacity 0.65s ease ${0.08 + cardIndex * 0.14}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.08 + cardIndex * 0.14}s` } : {}),
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", borderRadius: "18px", background: `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, rgba(255,255,255,0.07) 0%, transparent 65%)`, opacity: tilt.isHovered ? 1 : 0, transition: "opacity 0.35s ease" }} />
      <div style={{ position: "absolute", top: 0, left: 0, height: "2px", background: exp.accent, width: tilt.isHovered || expanded ? "100%" : "0%", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)", opacity: 0.9 }} />
      <div style={{ position: "absolute", top: "2px", left: 0, bottom: 0, width: "2px", background: `linear-gradient(to bottom, ${exp.accent}, transparent)`, opacity: tilt.isHovered || expanded ? 0.5 : 0, transition: "opacity 0.4s ease" }} />

      <div style={{ position: "relative", zIndex: 2, padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "1rem" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 800, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", letterSpacing: "-0.02em", color: "#fff", transform: tilt.isHovered ? "translateX(4px)" : "none", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", display: "inline-block" }}>
                {exp.company}
              </span>
              <span style={{ fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.55rem", borderRadius: "999px", background: `${exp.accent}1a`, border: `1px solid ${exp.accent}40`, color: exp.accent, whiteSpace: "nowrap" }}>
                {exp.type}
              </span>
            </div>
            <div style={{ fontWeight: 500, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", letterSpacing: "-0.01em" }}>{exp.role}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 }}>
            <span style={{ fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: exp.accent, opacity: 0.85, whiteSpace: "nowrap" }}>{exp.period}</span>
            <span style={{ fontWeight: 400, fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)" }}>{exp.id}</span>
          </div>
        </div>

        <p style={{ fontWeight: 400, fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: "0 0 1.1rem", maxWidth: "68ch" }}>{exp.headline}</p>

        <div style={{ overflow: "hidden", maxHeight: expanded ? "600px" : "0", opacity: expanded ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease", marginBottom: expanded ? "1.1rem" : "0" }}>
          <ul style={{ listStyle: "none", margin: "0 0 0.5rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {exp.bullets.map((bullet, bi) => (
              <li key={bi} style={{ display: "flex", gap: "0.65rem", fontSize: "0.78rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: exp.accent, opacity: 0.7, flexShrink: 0, marginTop: "0.15rem" }}>▸</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.65rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {exp.stack.map((tag, ti) => (
              <span key={tag} style={{ fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.06em", padding: "0.25rem 0.65rem", borderRadius: "999px", background: tilt.isHovered ? `${exp.accent}1a` : "rgba(255,255,255,0.06)", border: tilt.isHovered ? `1px solid ${exp.accent}40` : "1px solid rgba(255,255,255,0.09)", color: tilt.isHovered ? exp.accent : "rgba(255,255,255,0.5)", transition: `all 0.3s ease ${ti * 40}ms` }}>
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: exp.accent, opacity: 0.75 }}>
            {expanded ? "Show less ↑" : "Details ↓"}
          </span>
        </div>
      </div>
    </div>
  );
};

const TimelineConnector: FC<{ accent: string }> = ({ accent }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "2.5rem" }}>
    <div style={{ width: "1px", height: "100%", background: `linear-gradient(to bottom, ${accent}60, rgba(255,255,255,0.06))` }} />
  </div>
);

const Experience: FC = () => {
  const [ref, sectionVisible] = useReveal();

  return (
    <section id="experience" ref={ref} className="section-pad relative z-1 min-h-screen py-24 md:py-32">
      <ScrollRevealBlock delay={0}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <FlickerHeading text="Experience" tag="h2" style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#ffffff", margin: 0, lineHeight: 1 }} />
          <span style={{ fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
            {experiences.length} positions
          </span>
        </div>
      </ScrollRevealBlock>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {experiences.map((exp, i) => (
          <div key={exp.id}>
            <ExperienceCard exp={exp} cardIndex={i} sectionVisible={sectionVisible} />
            {i < experiences.length - 1 && <TimelineConnector accent={exp.accent} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
