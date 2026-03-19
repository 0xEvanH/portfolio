export type SectionId = "home" | "work" | "skills" | "about" | "contact";

export interface Project {
  id: string;
  title: string;
  stack: string[];
  year: string;
  desc: string;
  link: string;
  img: string;
  accent: string;
  size: "wide" | "tall" | "square";
}

export interface Skill {
  label: string;
  value: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface ContactLink {
  label: string;
  href: string;
  detail: string;
}

export interface RichSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}
