import { type FC, useState } from "react";
import { WHITE, WHITE_DIM, WHITE_LINE } from "../constants";
import { useReveal } from "../hooks/useReveal";
import type { ContactLink } from "../types";
import ScrollRevealBlock from "./shared/ScrollRevealBlock";
import FlickerHeading from "./shared/FlickerHeading";
import { Divider, MarqueeStrip } from "./shared/MarqueeAndDivider";

const Contact: FC = () => {
  const [ref, sectionVisible] = useReveal();
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);

  const contactLinks: ContactLink[] = [
    { label: "GitHub", href: "https://github.com/0xevanh", detail: "github.com/0xevanh" },
    { label: "Email",  href: "mailto:0xevanh@protonmail.com", detail: "0xevanh@protonmail.com" },
  ];

  return (
    <section id="contact" ref={ref} className="section-pad relative z-1 min-h-screen pt-24 md:pt-32 pb-20">
      <ScrollRevealBlock delay={0} style={{ marginBottom: "3.5rem" }}>
        <FlickerHeading text="Contact" tag="h2" style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#ffffff", margin: 0, lineHeight: 1 }} />
      </ScrollRevealBlock>

      <ScrollRevealBlock delay={0.1} style={{ marginBottom: "4rem" }}>
        <FlickerHeading text="Get in touch." tag="h3" style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "#ffffff", margin: 0 }} />
      </ScrollRevealBlock>

      <div style={{ maxWidth: "480px", opacity: sectionVisible ? 1 : 0, transition: "opacity 0.65s ease 0.28s" }}>
        <Divider visible={sectionVisible} />
        {contactLinks.map((link, i) => (
          <div key={link.label} className="overflow-hidden">
            <a
              href={link.href}
              onMouseEnter={() => setHoveredLinkIndex(i)}
              onMouseLeave={() => setHoveredLinkIndex(null)}
              className="flex justify-between items-center py-[1.4rem] no-underline"
              style={{ transform: hoveredLinkIndex === i ? "translateX(10px)" : "none", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
            >
              <span className="flex" style={{ fontWeight: 900, fontSize: "clamp(1.1rem, 4vw, 1.8rem)", letterSpacing: "-0.02em" }}>
                {link.label.split("").map((char, charIndex) => (
                  <span key={charIndex} className="inline-block" style={{ color: hoveredLinkIndex === i ? WHITE : WHITE_DIM, transform: hoveredLinkIndex === i ? `translateY(${Math.sin(charIndex * 0.9) * -5}px)` : "translateY(0)", transition: `color 0.25s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${charIndex * 35}ms` }}>
                    {char}
                  </span>
                ))}
              </span>

              <span className="relative inline-block w-32 text-right">
                <span className="block absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap" style={{ fontWeight: 400, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.03em", opacity: hoveredLinkIndex === i ? 0 : 1, transform: hoveredLinkIndex === i ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.22s ease, transform 0.3s ease" }}>
                  {link.detail}
                </span>
                <span className="block text-white" style={{ fontWeight: 700, fontSize: "1.1rem", opacity: hoveredLinkIndex === i ? 1 : 0, transform: hoveredLinkIndex === i ? "translateY(0) rotate(0deg)" : "translateY(-8px) rotate(-45deg)", transition: "opacity 0.22s ease 0.05s, transform 0.35s cubic-bezier(0.16,1,0.3,1) 0.05s" }}>↗</span>
              </span>
            </a>
            <Divider visible={sectionVisible} />
          </div>
        ))}
      </div>

      <div className="mt-24" style={{ opacity: sectionVisible ? 0.6 : 0, transition: "opacity 1s ease 0.5s" }}>
        <MarqueeStrip items={["Get in touch", "Open to opportunities", "Evan Howard", "2026", "Ireland"]} />
      </div>

      <div className="mt-12 pt-6 flex justify-between" style={{ borderTop: `1px solid ${WHITE_LINE}`, fontWeight: 400, fontSize: "0.62rem", letterSpacing: "0.07em", color: WHITE_DIM, opacity: sectionVisible ? 1 : 0, transition: "opacity 0.65s ease 0.4s" }}>
        <span>© 2026 - Evan Howard</span>
        <span>Portfolio / Personal Profile</span>
      </div>
    </section>
  );
};

export default Contact;
