import { type CSSProperties, type FC, useState } from "react";
import { WHITE_DIM } from "../../constants";
import type { RichSegment } from "../../types";

const AnimatedRichText: FC<{
  segments: RichSegment[];
  delay?: number;
  visible: boolean;
  style?: CSSProperties;
}> = ({ segments, delay = 0, visible, style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <p
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="m-0 cursor-default"
      style={{
        fontWeight: 400,
        fontSize: "0.9rem",
        lineHeight: 1.9,
        color: isHovered ? "rgba(255,255,255,0.62)" : WHITE_DIM,
        opacity: visible ? 1 : 0,
        transform: visible ? (isHovered ? "translateX(6px)" : "none") : "translateY(20px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.45s cubic-bezier(0.16,1,0.3,1), color 0.3s ease`,
        ...style,
      }}
    >
      {segments.map((seg, i) => {
        if (seg.bold && seg.italic) {
          return (
            <em key={i} style={{
              fontWeight: 900, fontStyle: "italic",
              color: isHovered ? "#ffffff" : "rgba(255,255,255,0.75)",
              letterSpacing: "-0.01em",
              display: "inline-block",
              transform: isHovered ? "translateY(-2px) skewX(-2deg)" : "none",
              transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, color 0.3s ease`,
            }}>{seg.text}</em>
          );
        }
        if (seg.bold) {
          return (
            <strong key={i} style={{
              fontWeight: 900,
              color: isHovered ? "#ffffff" : "rgba(255,255,255,0.8)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              transform: isHovered ? "translateY(-1px)" : "none",
              transition: `transform 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, color 0.3s ease`,
            }}>{seg.text}</strong>
          );
        }
        if (seg.italic) {
          return (
            <em key={i} style={{
              fontStyle: "italic",
              color: isHovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.32)",
              display: "inline-block",
              transform: isHovered ? "skewX(-3deg)" : "none",
              transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, color 0.3s ease`,
            }}>{seg.text}</em>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </p>
  );
};

export default AnimatedRichText;
