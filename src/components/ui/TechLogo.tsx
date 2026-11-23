/* eslint-disable @next/next/no-img-element */
/**
 * Brand logos: official devicon "original" SVGs in public/logos/devicon (MIT, see LICENSE there).
 * Concept skills: custom thin line icons in one consistent style (24×24, 1.5 stroke).
 */

export const BRAND: Record<string, { file: string; tint: string; label: string }> = {
  csharp: { file: "csharp.svg", tint: "#9b4f96", label: "C#" },
  dotnetcore: { file: "dotnetcore.svg", tint: "#512bd4", label: ".NET" },
  react: { file: "react.svg", tint: "#61dafb", label: "React" },
  typescript: { file: "typescript.svg", tint: "#3178c6", label: "TypeScript" },
  vitejs: { file: "vitejs.svg", tint: "#9466ff", label: "Vite" },
  html5: { file: "html5.svg", tint: "#e44d26", label: "HTML5" },
  tailwindcss: { file: "tailwindcss.svg", tint: "#38bdf8", label: "Tailwind CSS" },
  microsoftsqlserver: { file: "microsoftsqlserver.svg", tint: "#cc2927", label: "SQL Server" },
  github: { file: "github.svg", tint: "#6e7681", label: "GitHub" },
  githubactions: { file: "githubactions.svg", tint: "#2088ff", label: "GitHub Actions" },
  azure: { file: "azure.svg", tint: "#0089d6", label: "Azure" },
  docker: { file: "docker.svg", tint: "#2496ed", label: "Docker" },
};

const P = (d: string) => <path d={d} />;

export const CONCEPT: Record<string, React.ReactNode> = {
  api: <>{P("M8 7 3 12l5 5M16 7l5 5-5 5")}{P("M13.5 5 10.5 19")}</>,
  orm: <><ellipse cx="12" cy="6" rx="7" ry="2.6" />{P("M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6")}{P("M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6")}</>,
  query: <>{P("M4 6h16M4 12h10M4 18h6")}<circle cx="17.5" cy="16.5" r="2.5" />{P("m19.4 18.4 1.8 1.8")}</>,
  rings: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5.5" /><circle cx="12" cy="12" r="2" /></>,
  layers: <>{P("m12 3 9 5-9 5-9-5 9-5Z")}{P("m3 13 9 5 9-5")}{P("m3 17.5 9 4.5 9-4.5")}</>,
  repo: <><rect x="4" y="4" width="16" height="16" rx="2" />{P("M4 9h16M9 9v11")}</>,
  transfer: <>{P("M4 8h13l-3-3M20 16H7l3 3")}</>,
  fhir: <>{P("M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z")}{P("M8 11.5h2l1-2 2 4 1-2h2")}</>,
  exchange: <><rect x="3" y="4" width="7" height="7" rx="1.5" /><rect x="14" y="13" width="7" height="7" rx="1.5" />{P("M10 7.5h4a3 3 0 0 1 3 3V13M14 16.5h-4a3 3 0 0 1-3-3V11")}</>,
  record: <><rect x="5" y="3" width="14" height="18" rx="2" />{P("M9 8h6M9 12h6M9 16h3")}</>,
  shield: <>{P("M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z")}{P("m9 12 2 2 4-4")}</>,
  law: <>{P("M12 4v16M7 20h10M5 7h14")}{P("M5 7 2.5 13a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z")}</>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" />{P("M8 10V7a4 4 0 0 1 8 0v3M12 14v2")}</>,
  plug: <>{P("M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v5")}</>,
  migrate: <><ellipse cx="7" cy="7" rx="4" ry="1.8" />{P("M3 7v8c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V7")}{P("M14 12h7m-2.5-2.5L21 12l-2.5 2.5")}</>,
  er: <><rect x="2.5" y="4" width="7" height="5" rx="1" /><rect x="14.5" y="15" width="7" height="5" rx="1" />{P("M9.5 6.5H13v11h1.5M13 15.5l1.5 2-1.5 2")}</>,
  loop: <>{P("M20 12a8 8 0 0 1-14 5.3M4 12A8 8 0 0 1 18 6.7")}{P("M18 3v3.7h-3.7M6 21v-3.7h3.7")}</>,
  sprint: <>{P("M4 12a8 8 0 1 0 8-8")}{P("M12 8v4l3 2M12 4H8")}</>,
  kanban: <><rect x="3" y="4" width="18" height="16" rx="2" />{P("M9 4v16M15 4v16")}<rect x="4.5" y="7" width="3" height="3" rx=".6" /><rect x="10.5" y="7" width="3" height="5" rx=".6" /><rect x="16.5" y="7" width="3" height="2.5" rx=".6" /></>,
  objects: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />{P("M7 11v6h6M17 13V7h-6")}</>,
  review: <>{P("M4 5h16v11H9l-5 4V5Z")}{P("m9 10.5 2 2 4-4")}</>,
  branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="8" r="2" />{P("M6 7v10M18 10c0 4-4 4-10 7")}</>,
  home: <>{P("M4 11 12 4l8 7v9H4v-9Z")}{P("M12 12v5M9.5 14.5h5")}</>,
  mind: <>{P("M9 20v-3.5C6 15.6 4 13 4 10a7 7 0 0 1 14-.5l2 3.5h-2v3a2 2 0 0 1-2 2h-2v2")}{P("M10 8.5a2 2 0 0 1 3.5 1.5c0 1.5-1.5 1.5-1.5 3")}</>,
  care: <>{P("M3 13h3l3 4h7a2 2 0 0 0 0-4h-4")}{P("M12 10.5S8.5 8.4 8.5 6a2 2 0 0 1 3.5-1.3A2 2 0 0 1 15.5 6c0 2.4-3.5 4.5-3.5 4.5Z")}</>,
  pulse: <>{P("M2 12h4l2-5 4 10 3-7 2 2h5")}</>,
  flask: <>{P("M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3")}{P("M7 15h10")}</>,
  check: <><circle cx="12" cy="12" r="9" />{P("m8 12 3 3 5-6")}</>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2" />{P("M8 20h8M12 16v4M10 10h4M12 8v4")}</>,
  triage: <>{P("M4 6h16M7 12h10M10 18h4")}</>,
  speech: <>{P("M3 5h11v8H8l-3 3v-3H3V5Z")}{P("M14 9h7v8h-2v3l-3-3h-4v-3")}</>,
  book: <>{P("M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z")}{P("M4 19a2 2 0 0 1 2-2h13M9 8h6")}</>,
  list: <>{P("M9 6h11M9 12h11M9 18h11")}{P("m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2")}</>,
};

export function isBrand(key: string): boolean {
  return key in BRAND;
}

export default function TechLogo({
  logo,
  size = 24,
  label,
  glow = false,
  className = "",
}: {
  logo: string;
  size?: number;
  label?: string;
  glow?: boolean;
  className?: string;
}) {
  const brand = BRAND[logo];
  const style = { width: size, height: size } as React.CSSProperties;
  if (brand) {
    return (
      <span
        className={`tlogo ${glow ? "tlogo-glow" : ""} ${className}`}
        style={{ ...style, ["--tint" as string]: brand.tint }}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <img src={`/logos/devicon/${brand.file}`} alt="" width={size} height={size} loading="lazy" decoding="async" />
      </span>
    );
  }
  return (
    <span className={`tlogo ${className}`} style={style} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={size > 60 ? 0.9 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        {CONCEPT[logo] ?? CONCEPT.check}
      </svg>
    </span>
  );
}
