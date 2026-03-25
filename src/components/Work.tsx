import { type FC, useState } from "react";
import { useMagneticTilt } from "../hooks/useMagneticTilt";
import { useReveal } from "../hooks/useReveal";
import { projects } from "../data";
import type { Project } from "../types";
import ScrollRevealBlock from "./shared/ScrollRevealBlock";
import FlickerHeading from "./shared/FlickerHeading";
import ProjectModal from "./ProjectModal";

const ProjectCard: FC<{
  project: Project;
  cardIndex: number;
  sectionVisible: boolean;
  onClick: () => void;
}> = ({ project, cardIndex, sectionVisible, onClick }) => {
  const { ref, tilt, onMouseMove, onMouseEnter, onMouseLeave } = useMagneticTilt(10);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWide = project.size === "wide";
  const isTall = project.size === "tall";

  const cardTransform  = `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.isHovered ? 1.025 : 1})`;
  const imageTransform = `translate(${(tilt.lightX - 50) * -0.08}%, ${(tilt.lightY - 50) * -0.08}%) scale(${tilt.isHovered ? 1.06 : 1.0})`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden will-change-transform"
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        gridRow:    isTall ? "span 2" : "span 1",
        background: "#0d0d0d",
        border: tilt.isHovered ? "1px solid rgba(255,255,255,0.13)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: tilt.isHovered ? `0 24px 60px rgba(0,0,0,0.7), 0 0 40px -10px ${project.accent}33` : "0 4px 24px rgba(0,0,0,0.4)",
        transform: cardTransform,
        transition: tilt.isHovered
          ? "border-color 0.3s ease, box-shadow 0.4s ease"
          : "transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.4s ease",
        cursor: "pointer",
        opacity: sectionVisible ? 1 : 0,
        ...(!sectionVisible ? {
          transition: `opacity 0.65s ease ${0.08 + cardIndex * 0.12}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.08 + cardIndex * 0.12}s`,
        } : {}),
      }}
    >
      <div className="absolute inset-0 z-3 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, rgba(255,255,255,0.07) 0%, transparent 65%)`, opacity: tilt.isHovered ? 1 : 0, transition: "opacity 0.35s ease" }} />

      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover"
          style={{ opacity: imageLoaded ? (tilt.isHovered ? 0.42 : 0.28) : 0, transform: imageTransform, transition: "opacity 0.5s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)", filter: "grayscale(20%)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, transparent 15%, rgba(0,0,0,0.85) 100%)" }} />
      </div>

      <div className="absolute top-0 left-0 h-0.5" style={{ background: project.accent, width: tilt.isHovered ? "100%" : "0%", transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)", opacity: 0.9 }} />

      <div style={{ position: "absolute", bottom: "0.85rem", right: "0.85rem", zIndex: 4, fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: project.accent, opacity: tilt.isHovered ? 0.8 : 0, transition: "opacity 0.3s ease", pointerEvents: "none" }}>
        View Case Study →
      </div>

      <div className="relative z-2 h-full flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <span className="uppercase" style={{ fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.12em", color: project.accent, opacity: 0.85 }}>{project.year}</span>
          <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-lg flex items-center justify-center no-underline text-white"
            style={{ background: tilt.isHovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.9rem", transition: "all 0.25s ease", transform: tilt.isHovered ? "rotate(-45deg) scale(1.1)" : "none" }}
          >↗</a>
        </div>

        <div>
          <div className="mb-[0.4rem]" style={{ fontWeight: 400, fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>{project.id}</div>
          <h3 className="text-white m-0 mb-[0.65rem] leading-[1.08]" style={{ fontWeight: 900, letterSpacing: "-0.03em", fontSize: isWide ? "clamp(1.2rem, 2.5vw, 2rem)" : "clamp(1rem, 2vw, 1.5rem)", transform: tilt.isHovered ? "translateX(5px)" : "none", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
            {project.title}
          </h3>
          <p className="m-0 mb-[1.1rem] max-w-[42ch]" style={{ fontWeight: 400, fontSize: "0.78rem", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", opacity: (tilt.isHovered || isTall) ? 1 : 0, transform: (tilt.isHovered || isTall) ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s" }}>
            {project.desc}
          </p>
          <div className="flex gap-[0.4rem] flex-wrap">
            {project.stack.map((tag, tagIndex) => (
              <span key={tag} className="rounded-full py-1 px-[0.65rem]" style={{ fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.06em", background: tilt.isHovered ? `${project.accent}1a` : "rgba(255,255,255,0.06)", border: tilt.isHovered ? `1px solid ${project.accent}40` : "1px solid rgba(255,255,255,0.09)", color: tilt.isHovered ? project.accent : "rgba(255,255,255,0.5)", transition: `all 0.3s ease ${tagIndex * 45}ms`, transform: tilt.isHovered ? "translateY(0)" : "translateY(2px)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Work: FC = () => {
  const [ref, sectionVisible] = useReveal();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" ref={ref} className="section-pad relative z-1 min-h-screen py-24 md:py-32">
        <ScrollRevealBlock delay={0}>
          <div className="flex justify-between items-end mb-10 md:mb-12">
            <FlickerHeading text="Work" tag="h2" style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#ffffff", margin: 0, lineHeight: 1 }} />
            <span className="uppercase" style={{ fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.38)" }}>{projects.length} projects</span>
          </div>
        </ScrollRevealBlock>

        <div className="work-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} cardIndex={i} sectionVisible={sectionVisible} onClick={() => setActiveProject(project)} />
          ))}
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
};

export default Work;
