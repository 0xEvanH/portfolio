import { type FC, useEffect, useState } from "react";
import type { Project } from "../types";

interface SubSite {
  label: string;
  url: string;
  github?: string;
  desc: string;
}

const ESPORTS_SITES: SubSite[] = [
  { label: "Take Your Throne", url: "https://takeyourthrone.com", github: "https://github.com/0xevanh/", desc: "Competitive Org" },
  { label: "Oce5n", url: "https://oce5n.evhsync.com", github: "https://github.com/0xevanh", desc: "Competitive Org (Work in Progress)" },
  { label: "Thrive eSports", url: "https://thriveesports.com", github: "https://github.com/0xevanh", desc: "Competitive Org, including admin content management system integrated on site." },
  { label: "Everest Talents", url: "https://everesttalents.com", github: "https://github.com/0xevanh", desc: "Talent Agency" },
];

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const btnBase: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  padding: "0.55rem 1rem", borderRadius: "9px",
  fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.05em",
  textDecoration: "none", cursor: "pointer", border: "none",
  transition: "all 0.2s ease", whiteSpace: "nowrap",
};

const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const [sitesOpen, setSitesOpen] = useState(false);

  useEffect(() => {
    if (!project) { setSitesOpen(false); return; }
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
  const isEsportsWeb = project.id === "05" || project.tags?.includes("esports");
  const isEsportsDash = project.id === "05" || project.tags?.includes("esports-dash");
  const showTestLogin = isStudySite || isEsportsDash;
  const testCreds     = isStudySite
    ? { label: "Study Site",        user: "test@evhsync.com", pass: "Test1234"  }
    : { label: "Esports Dashboard", user: "test@evhsync.com",      pass: "Test1234" };

  const accent = project.accent;

  return (
    <>
      <style>{`
        @keyframes pmFade  { from { opacity:0 } to { opacity:1 } }
        @keyframes pmScale { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }
        @keyframes pmSlide { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }

        .pm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          background: rgba(0,0,0,0.80);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: pmFade 0.2s ease;
        }

        .pm-card {
          position: relative;
          width: 100%; max-width: 900px;
          max-height: calc(100dvh - 3rem);
          background: #0d0d0d;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.09);
          overflow: hidden;
          animation: pmScale 0.25s cubic-bezier(0.16,1,0.3,1);
          display: flex;
          flex-direction: column;
        }

        /* ── header banner ── */
        .pm-banner {
          position: relative;
          width: 100%;
          height: 160px;
          flex-shrink: 0;
          background: #111;
          overflow: hidden;
        }
        @media (max-width: 600px) { .pm-banner { height: 110px; } }

        /* ── body: left desc + right actions ── */
        .pm-body {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 0;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        @media (max-width: 680px) {
          .pm-body {
            grid-template-columns: 1fr;
          }
          .pm-actions { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07); }
        }

        .pm-desc {
          padding: 1.5rem 1.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .pm-actions {
          padding: 1.5rem;
          border-left: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow-y: auto;
        }

        /* sub-sites dropdown */
        .pm-subsites {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;
        }
        .pm-subsites.open {
          max-height: 400px;
          opacity: 1;
        }

        .pm-subsite-row {
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.65rem 0.75rem;
          animation: pmSlide 0.3s ease both;
        }
        .pm-subsite-row:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.13);
        }
      `}</style>

      <div className="pm-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <div className="pm-card" style={{ boxShadow: `0 32px 80px rgba(0,0,0,0.85), 0 0 50px -15px ${accent}44` }}>

          {/* accent top bar */}
          <div style={{ height: "2px", background: accent, flexShrink: 0 }} />

          {/* banner image */}
          <div className="pm-banner">
            <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, filter: "grayscale(15%)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, #0d0d0d 0%, transparent 40%, transparent 60%, #0d0d0d 100%)` }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0d0d0d 100%)" }} />

            {/* close */}
            <button
              onClick={onClose}
              style={{ position: "absolute", top: "0.75rem", right: "0.75rem", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
            >✕</button>
          </div>

          {/* body */}
          <div className="pm-body">

            <div className="pm-desc">
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: accent, opacity: 0.9 }}>{project.year}</span>
                <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.12)" }} />
                <span style={{ fontWeight: 400, fontSize: "0.56rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>{project.id}</span>
              </div>

              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", letterSpacing: "-0.03em", color: "#fff", margin: 0, lineHeight: 1.08 }}>
                {project.title}
              </h2>

              <p style={{ fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.78, color: "rgba(255,255,255,0.52)", margin: 0 }}>
                {project.caseStudy ?? project.desc}
              </p>

              {/* stack chips */}
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.25rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", alignSelf: "center", marginRight: "0.2rem" }}>Stack</span>
                {project.stack.map((tag) => (
                  <span key={tag} style={{ fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0.05em", padding: "0.2rem 0.6rem", borderRadius: "999px", background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pm-actions">

              <div style={{ fontWeight: 700, fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.25rem" }}>
                Links
              </div>

              {/* test login box */}
              {showTestLogin && (
                <div style={{ padding: "0.75rem", borderRadius: "10px", background: `${accent}0d`, border: `1px solid ${accent}28`, marginBottom: "0.35rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: "0.5rem" }}>Test Login</div>
                  {([["Email", testCreds.user], ["Pass", testCreds.pass]] as const).map(([l, v]) => (
                    <div key={l} style={{ marginBottom: "0.35rem" }}>
                      <div style={{ fontSize: "0.52rem", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.15rem" }}>{l}</div>
                      <code style={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono','Fira Mono',monospace", color: "rgba(255,255,255,0.72)", background: "rgba(255,255,255,0.05)", padding: "0.15rem 0.45rem", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.07)", display: "block", wordBreak: "break-all" }}>{v}</code>
                    </div>
                  ))}
                </div>
              )}

              {isEsportsWeb ? (
                <div>
                  <button
                    onClick={() => setSitesOpen(v => !v)}
                    style={{ ...btnBase, width: "100%", justifyContent: "space-between", background: accent, color: "#000" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >
                    <span>↗ View Sites</span>
                    <span style={{ fontSize: "0.65rem", transform: sitesOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", display: "inline-block" }}>▾</span>
                  </button>

                  <div className={`pm-subsites${sitesOpen ? " open" : ""}`} style={{ marginTop: "0.5rem" }}>
                    {ESPORTS_SITES.map((site, i) => (
                      <div key={site.label} className="pm-subsite-row" style={{ animationDelay: `${i * 55}ms` }}>
                        <div style={{ fontWeight: 700, fontSize: "0.72rem", color: "#fff", marginBottom: "0.2rem" }}>{site.label}</div>
                        <div style={{ fontWeight: 400, fontSize: "0.62rem", color: "rgba(255,255,255,0.38)", marginBottom: "0.45rem" }}>{site.desc}</div>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <a href={site.url} target="_blank" rel="noopener noreferrer"
                            style={{ ...btnBase, background: `${accent}20`, border: `1px solid ${accent}40`, color: accent, padding: "0.3rem 0.7rem", fontSize: "0.62rem" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}35`; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}20`; }}
                          >↗ Live</a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      style={{ ...btnBase, width: "100%", justifyContent: "center", marginTop: "0.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.11)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"; }}
                    >⌥ All Repos</a>
                  )}
                </div>
              ) : (
                <>
                  {/* normal live site button */}
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    style={{ ...btnBase, justifyContent: "center", background: accent, color: "#000" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
                  >↗ Live Site</a>

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      style={{ ...btnBase, justifyContent: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.11)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
                    >⌥ GitHub</a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
