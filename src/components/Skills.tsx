import { type FC, useState } from "react";
import { WHITE, WHITE_DIM } from "../constants";
import { useReveal } from "../hooks/useReveal";
import { skills } from "../data";
import type { Skill } from "../types";
import ScrollRevealBlock from "./shared/ScrollRevealBlock";
import FlickerHeading from "./shared/FlickerHeading";
import { Divider, MarqueeStrip } from "./shared/MarqueeAndDivider";

const SkillRow: FC<{ skill: Skill; rowIndex: number; sectionVisible: boolean }> = ({ skill, rowIndex, sectionVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chips = skill.value.split(", ");

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="grid gap-8 cursor-default py-[1.8rem]"
        style={{
          gridTemplateColumns: "12rem 1fr",
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? (isHovered ? "translateX(8px)" : "none") : "translateY(16px)",
          transition: `opacity 0.65s ease ${0.1 + rowIndex * 0.08}s, transform ${isHovered ? "0.4s" : "0.65s"} cubic-bezier(0.16,1,0.3,1) ${isHovered ? "0s" : 0.1 + rowIndex * 0.08 + "s"}`,
        }}
      >
        <span
          className="uppercase pt-[0.15rem]"
          style={{
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: isHovered ? WHITE : WHITE_DIM,
            transition: "color 0.3s ease",
          }}
        >
          {skill.label}
        </span>
        <span
          className="text-white leading-[1.3]"
          style={{ fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.4rem)", letterSpacing: "-0.015em" }}
        >
          {chips.map((chip, chipIndex) => (
            <span key={chip}>
              <span
                className="inline-block"
                style={{
                  transform: isHovered ? `translateY(${-3 - chipIndex * 1}px)` : "none",
                  transition: `transform 0.45s cubic-bezier(0.16,1,0.3,1) ${chipIndex * 55}ms`,
                  color: isHovered ? WHITE : "rgba(255,255,255,0.85)",
                }}
              >
                {chip}
              </span>
              {chipIndex < chips.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.2)" }}>, </span>
              )}
            </span>
          ))}
        </span>
      </div>
      <Divider visible={sectionVisible} />
    </div>
  );
};

const Skills: FC = () => {
  const [ref, sectionVisible] = useReveal();
  const allTechItems = skills.flatMap(s => s.value.split(", "));

  return (
    <section id="skills" ref={ref} className="relative z-1 min-h-screen px-20 pt-32 pb-24">
      <ScrollRevealBlock delay={0} style={{ marginBottom: "3.5rem" }}>
        <FlickerHeading
          text="Skills"
          tag="h2"
          style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#ffffff", margin: 0, lineHeight: 1 }}
        />
      </ScrollRevealBlock>
      <Divider visible={sectionVisible} />
      {skills.map((skill, i) => (
        <SkillRow key={skill.label} skill={skill} rowIndex={i} sectionVisible={sectionVisible} />
      ))}
      <div
        className="mt-12"
        style={{ opacity: sectionVisible ? 1 : 0, transition: "opacity 1s ease 0.6s" }}
      >
        <MarqueeStrip items={allTechItems} accent="rgba(255,255,255,0.2)" />
      </div>
    </section>
  );
};

export default Skills;
