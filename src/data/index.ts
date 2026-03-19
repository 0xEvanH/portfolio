import type { Project, Skill } from "../types";

export const projects: Project[] = [
  {
    id: "01", title: "Study Tools Suite",
    stack: ["React", "Typescript", "TailwindCSS", "ExpressJS"], year: "2025",
    desc: "A suite of study tools: flashcard/notes creation, scheduling, and time/progress tracking via intuitive graphs and checklists.",
    link: "https://github.com", img: "", accent: "#e8d5b0", size: "wide",
  },
  {
    id: "02", title: "eSport Team Websites",
    stack: ["React", "TailwindCSS", "Python"], year: "2026",
    desc: "Websites commissioned by and created for eSports teams, built to showcase their brand and give a face to their brand.",
    link: "https://github.com", img: "", accent: "#b0cce8", size: "square",
  },
  {
    id: "03", title: "3D Dynamic Visualiser",
    stack: ["ThreeJS", "Typescript", "React Three Fiber"], year: "2026",
    desc: "A tool that allows an imported FBX to be visualised in a clear scene to test lighting and atmospheric effects.",
    link: "https://github.com", img: "", accent: "#c4b0e8", size: "square",
  },
  {
    id: "04", title: "Neural Network AI/Spam Detector",
    stack: ["React", "Python", "ThreeJS"], year: "2026",
    desc: "A visualisation of how a neural network could be used to determine whether a message is human-written, AI or a spam message.",
    link: "https://github.com", img: "", accent: "#c4b0e8", size: "square",
  },
  {
    id: "05", title: "eSports Tracking Dashboard",
    stack: ["React", "Python", "TailwindCSS"], year: "2026",
    desc: "An app built to allow organisations within eSports to track term progress and organise everything in one place.",
    link: "https://github.com", img: "", accent: "#c4b0e8", size: "square",
  },
];

export const skills: Skill[] = [
  { label: "Languages",  value: "TypeScript, Python, C#, HTML&CSS, GDScript" },
  { label: "Systems", value: "Git, Node.js, Vite, Coolify, Hetzner VPS, Linux" },
  { label: "Frameworks", value: "React, Three.js, React Three Fiber, TailwindCSS, Express.js, Godot, Unity" },
  { label: "Focus",      value: "3D / WebGL, AI & Data, Full-Stack Web, Game Development" },
];
