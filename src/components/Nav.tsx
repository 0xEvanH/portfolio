import { type FC, type JSX, useState } from "react";
import { WHITE, WHITE_DIM, WHITE_LINE, SECTION_IDS, SCROLL_DURATION_MS } from "../constants";
import type { SectionId } from "../types";

const sectionIcons: Record<SectionId, JSX.Element> = {
  home:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  work:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  skills:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  about:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  experience: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2m3 0h5M7 12h5"/></svg>,
  contact:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
};

export const ProgressBar: FC<{ activeSectionIndex: number }> = ({ activeSectionIndex }) => (
  <div className="progress-bar-hide-mobile fixed left-0 top-0 w-0.5 h-screen z-50" style={{ background: "rgba(255,255,255,0.06)" }}>
    <div
      className="w-full bg-white"
      style={{
        height: `${((activeSectionIndex + 1) / SECTION_IDS.length) * 100}%`,
        transition: `height ${SCROLL_DURATION_MS}ms cubic-bezier(0.87, 0, 0.13, 1)`,
      }}
    />
  </div>
);

export const SideNav: FC<{ activeSectionIndex: number; scrollToSection: (i: number) => void }> = ({
  activeSectionIndex,
  scrollToSection,
}) => {
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);

  const navLinks = [
    { id: "home"       as SectionId, label: "Home" },
    { id: "work"       as SectionId, label: "Work" },
    { id: "skills"     as SectionId, label: "Skills" },
    { id: "about"      as SectionId, label: "About" },
    { id: "experience" as SectionId, label: "Experience" },
    { id: "contact"    as SectionId, label: "Contact" },
  ];

  return (
    <nav className="sidenav-hide-mobile fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {navLinks.map(({ id, label }, i) => {
        const isActive  = activeSectionIndex === i;
        const isHovered = hoveredSection === id;
        const showLabel = isActive || isHovered;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(i)}
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
            title={label}
            className="flex items-center justify-end gap-[0.6rem] bg-transparent border-none cursor-pointer p-0"
          >
            <span
              className="whitespace-nowrap pointer-events-none"
              style={{
                fontWeight: isActive ? 700 : 400,
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: isActive ? WHITE : "rgba(255,255,255,0.5)",
                opacity: showLabel ? 1 : 0,
                transform: showLabel ? "translateX(0)" : "translateX(6px)",
                transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1), color 0.2s ease",
              }}
            >
              {label}
            </span>
            <div
              className="w-9 h-9 rounded-[9px] flex items-center justify-center backdrop-blur-[14px]"
              style={{
                background: isActive ? "rgba(255,255,255,0.13)" : isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                border: isActive ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.09)",
                boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 2px 8px rgba(0,0,0,0.2)",
                color: isActive ? WHITE : "rgba(255,255,255,0.4)",
                transition: "all 0.22s ease",
              }}
            >
              {sectionIcons[id]}
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export const SectionCounter: FC<{ activeSectionIndex: number }> = ({ activeSectionIndex }) => (
  <div
    className="section-counter-hide-mobile fixed bottom-8 left-8 z-50 flex items-center gap-2 pointer-events-none"
    style={{ fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.1em", color: WHITE_DIM }}
  >
    <span style={{ color: WHITE, transition: `color ${SCROLL_DURATION_MS}ms ease` }}>
      {String(activeSectionIndex + 1).padStart(2, "0")}
    </span>
    <span className="w-8 h-px" style={{ background: WHITE_LINE }} />
    <span>{String(SECTION_IDS.length).padStart(2, "0")}</span>
  </div>
);
