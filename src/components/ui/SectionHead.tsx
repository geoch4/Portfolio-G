import type { ReactNode } from "react";

/** Mono index tag + bold heading ending in one Instrument Serif italic word. */
export default function SectionHead({
  index,
  label,
  lead,
  accent,
  id,
  children,
}: {
  index: string;
  label: string;
  lead: string;
  accent: string;
  id: string;
  children?: ReactNode;
}) {
  return (
    <header className="sec-head">
      <p className="tag rv">
        <span>{index}</span> — {label}
      </p>
      <h2 className="h2" id={id}>
        <span className="rv-mask"><span>{lead}</span></span>{" "}
        <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
          <span><em>{accent}</em></span>
        </span>
      </h2>
      {children}
    </header>
  );
}
