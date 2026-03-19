import { type CSSProperties, type FC, type JSX, useEffect, useRef, useState } from "react";
import { SCRAMBLE_CHARS } from "../../constants";

const FlickerHeading: FC<{
  text: string;
  tag?: "h1" | "h2" | "h3" | "span";
  style?: CSSProperties;
}> = ({ text, tag = "h2", style }) => {
  const [displayChars, setDisplayChars] = useState(text.split(""));
  const [isHovered, setIsHovered]       = useState(false);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const charResolved = useRef<boolean[]>(text.split("").map(() => false));

  useEffect(() => {
    if (isHovered) {
      charResolved.current = text.split("").map(() => false);
      setDisplayChars(text.split(""));
      let tick = 0;

      intervalRef.current = setInterval(() => {
        tick++;
        setDisplayChars(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (charResolved.current[i]) return char;
            if (tick > i * 1.4 + 6) {
              charResolved.current[i] = true;
              return char;
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }),
        );
        if (charResolved.current.every(Boolean)) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 45);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayChars(text.split(""));
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, text]);

  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <Tag
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-default"
      style={style}
    >
      {displayChars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            whiteSpace: char === " " ? "pre" : undefined,
            transition: charResolved.current[i] ? "color 0.1s ease" : undefined,
            color: isHovered && !charResolved.current[i] ? "rgba(255,255,255,0.45)" : "#ffffff",
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
};

export default FlickerHeading;
