import { type FC, useEffect } from "react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const scrollY = window.scrollY;
    document.body.style.position  = "fixed";
    document.body.style.top       = `-${scrollY}px`;
    document.body.style.left      = "0";
    document.body.style.right     = "0";
    document.body.style.overflowY = "scroll";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.left      = "";
      document.body.style.right     = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isStudySite   = project.id === "01" || project.tags?.includes("study");
  const isEsports     = project.id === "05" || project.tags?.includes("esports");
  const showTestLogin = isStudySite || isEsports;
  const testCreds     = isStudySite
    ? { label: "Study Site",        user: "test@evhsync.com", pass: "Test1234"  }
    : { label: "Esports Dashboard", user: "test@evhsync.com",      pass: "Test1234" };

  return (
    <>
      <style>{`
        @keyframes modalFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }

        .pm-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          /* The overlay IS the scroll container — it must have a bounded height */
          height: 100dvh;
          overflow-y: auto;
          overscroll-behavior: contain;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: modalFadeIn 0.22s ease;
          /* padding creates breathing room around the card */
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        .pm-card {
          position: relative;
          width: 100%;
          max-width: 860px;
          /* centre horizontally, let height be natural so overflow-y on overlay kicks in */
          margin: 0 auto;
          border-radius: 20px;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.10);
          animation: modalSlideUp 0.28s cubic-bezier(0.16,1,0.3,1);
        }

        .pm-overlay::-webkit-scrollbar { width: 4px; }
        .pm-overlay::-webkit-scrollbar-track { background: transparent; }
        .pm-overlay::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
      `}</style>

      <div
        className="pm-overlay"
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="pm-card"
          style={{ boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 60px -20px ${project.accent}44` }}
        >
          <div style={{ height: "2px", background: project.accent, borderRadius: "20px 20px 0 0" }} />

          <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", background: "#111", overflow: "hidden", borderRadius: "0" }}>
            <img
              src={project.img}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, filter: "grayscale(10%)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #0d0d0d 100%)" }} />
            <button
              onClick={onClose}
              style={{ position: "absolute", top: "1rem", right: "1rem", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
            >✕</button>
          </div>

          <div style={{ padding: "2rem 2.25rem 2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: project.accent, opacity: 0.9 }}>{project.year}</span>
              <span style={{ fontWeight: 400, fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>{project.id}</span>
            </div>

            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.4rem)", letterSpacing: "-0.035em", color: "#fff", margin: "0 0 1rem", lineHeight: 1.05 }}>
              {project.title}
            </h2>

            <p style={{ fontWeight: 400, fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "0 0 1.75rem", maxWidth: "68ch" }}>
              {project.caseStudy ?? project.desc}
            </p>

            {showTestLogin && (
              <div style={{ marginBottom: "1.75rem", padding: "1rem 1.25rem", borderRadius: "12px", background: `${project.accent}0d`, border: `1px solid ${project.accent}30` }}>
                <p style={{ fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: project.accent, margin: "0 0 0.65rem" }}>
                  Test Login — {testCreds.label}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  {([["Username / Email", testCreds.user], ["Password", testCreds.pass]] as const).map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem", textTransform: "uppercase" }}>{label}</div>
                      <code style={{ fontSize: "0.76rem", fontFamily: "'JetBrains Mono','Fira Mono',monospace", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.06)", padding: "0.2rem 0.5rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)" }}>{val}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: "1.75rem" }}>
              <p style={{ fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 0.65rem" }}>Tech Stack</p>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {project.stack.map((tag, i) => (
                  <span key={tag} style={{ fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.07em", padding: "0.3rem 0.8rem", borderRadius: "999px", background: `${project.accent}1a`, border: `1px solid ${project.accent}40`, color: project.accent, animation: `modalSlideUp 0.3s ease ${i * 40}ms both` }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.6rem 1.2rem", borderRadius: "10px", background: project.accent, color: "#000", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.06em", textDecoration: "none", transition: "opacity 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
              >↗ Live Site</a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.6rem 1.2rem", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.06em", textDecoration: "none", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
                >⌥ GitHub</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
