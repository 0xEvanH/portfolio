import { type FC, useState } from "react";
import { WHITE, WHITE_DIM } from "../constants";
import { useReveal } from "../hooks/useReveal";
import type { Fact } from "../types";
import ScrollRevealBlock from "./shared/ScrollRevealBlock";
import FlickerHeading from "./shared/FlickerHeading";
import AnimatedRichText from "./shared/AnimatedRichText";
import { Divider } from "./shared/MarqueeAndDivider";

const FactRow: FC<{ fact: Fact; entranceDelay: number; sectionVisible: boolean }> = ({ fact, entranceDelay, sectionVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="py-[1.3rem] cursor-default"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "none" : "translateY(18px)",
          transition: `opacity 0.65s ease ${entranceDelay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${entranceDelay}s`,
        }}
      >
        <div
          className="uppercase mb-[0.4rem]"
          style={{
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: isHovered ? "0.16em" : "0.1em",
            color: WHITE_DIM,
            transition: "letter-spacing 0.4s ease",
          }}
        >
          {fact.label}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.92rem",
            color: isHovered ? WHITE : "rgba(255,255,255,0.85)",
            transform: isHovered ? "translateX(6px)" : "none",
            transition: "color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {fact.value}
        </div>
      </div>
      <Divider visible={sectionVisible} />
    </div>
  );
};

const About: FC = () => {
  const [ref, sectionVisible] = useReveal();

  const facts: Fact[] = [
    { label: "Status", value: "Applying - 2026 Entry" },
    { label: "Course", value: "Planning to study Computer Science" },
    { label: "Based",  value: "Ireland" },
    { label: "Start",  value: "September 2026" },
  ];

  const bioParagraphs = [
    [
      { text: "I'm a developer focused on systems that blur the boundary between " },
      { text: "software and physical reality", bold: true },
      { text: " - " },
      { text: "AR, real-time computation,", bold: true, italic: true },
      { text: " and the infrastructure that makes both possible." },
    ],
    [
      { text: "I write code the way I think about problems: " },
      { text: "methodically,", italic: true },
      { text: " with attention to " },
      { text: "what fails first.", bold: true },
      { text: " Every project here is a complete cycle from problem definition to " },
      { text: "working implementation.", bold: true },
    ],
    [
      { text: "I'm applying to study " },
      { text: "Immersive Software Engineering", bold: true, italic: true },
      { text: " because I want to build the " },
      { text: "foundational tools", bold: true },
      { text: " the next generation of human-computer interaction will depend on." },
    ],
  ];

  return (
    <section id="about" ref={ref} className="relative z-1 min-h-screen px-20 py-32">
      <ScrollRevealBlock delay={0} style={{ marginBottom: "3.5rem" }}>
        <FlickerHeading
          text="About"
          tag="h2"
          style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#ffffff", margin: 0, lineHeight: 1 }}
        />
      </ScrollRevealBlock>

      <ScrollRevealBlock delay={0.08} style={{ marginBottom: "5rem" }}>
        <blockquote className="m-0 p-0">
          <FlickerHeading
            text="I build things that didn't exist before I wrote them."
            tag="span"
            style={{ fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 3.2rem)", lineHeight: 1.12, letterSpacing: "-0.03em", color: "#ffffff" }}
          />
        </blockquote>
      </ScrollRevealBlock>

      <div className="grid gap-20" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="flex flex-col gap-[1.4rem]">
          {bioParagraphs.map((segments, i) => (
            <AnimatedRichText key={i} segments={segments} delay={0.2 + i * 0.1} visible={sectionVisible} />
          ))}
        </div>
        <div>
          <Divider visible={sectionVisible} />
          {facts.map((fact, i) => (
            <FactRow key={fact.label} fact={fact} entranceDelay={0.35 + i * 0.07} sectionVisible={sectionVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
