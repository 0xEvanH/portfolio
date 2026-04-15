import { useCallback, useEffect, useState } from "react";
import { SECTION_IDS } from "./constants";
import { useScrollTween } from "./hooks/useScrollTween";
import { Background, Intro } from "./components/Background";
import { ProgressBar, SideNav, SectionCounter, MobileNav } from "./components/Nav";
import Hero    from "./components/Hero";
import Work    from "./components/Work";
import Skills  from "./components/Skills";
import About   from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const scrollToSection = useScrollTween(activeSectionIndex, setActiveSectionIndex);

  const handleIntroDone = useCallback(() => {
    setTimeout(() => setPageReady(true), 60);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const visibleIndex = SECTION_IDS.findIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -10 && rect.top < window.innerHeight / 2;
      });
      if (visibleIndex !== -1) setActiveSectionIndex(visibleIndex);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <Background />
      <Intro onDone={handleIntroDone} />
      <ProgressBar    activeSectionIndex={activeSectionIndex} />
      <SideNav        activeSectionIndex={activeSectionIndex} scrollToSection={scrollToSection} />
      <SectionCounter activeSectionIndex={activeSectionIndex} />
      <MobileNav      activeSectionIndex={activeSectionIndex} scrollToSection={scrollToSection} />
      <Hero    ready={pageReady} />
      <Work />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </div>
  );
}