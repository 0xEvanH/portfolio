import { type FC } from "react";
import { WHITE_DIM, WHITE_LINE } from "../../constants";

export const MarqueeStrip: FC<{ items: string[]; accent?: string }> = ({
  items,
  accent = WHITE_DIM,
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex gap-12 w-max"
        style={{ animation: "marquee 18s linear infinite" }}
      >
        {repeatedItems.map((item, i) => (
          <span
            key={i}
            className="uppercase whitespace-nowrap"
            style={{ fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.14em", color: accent }}
          >
            {item} <span className="opacity-30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const Divider: FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="h-px"
    style={{
      background: WHITE_LINE,
      opacity: visible ? 1 : 0,
      transform: visible ? "scaleX(1)" : "scaleX(0.55)",
      transformOrigin: "left",
      transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}
  />
);
