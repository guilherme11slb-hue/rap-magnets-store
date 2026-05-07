import type { CSSProperties } from "react";

const COMMON: CSSProperties = { position: "absolute", pointerEvents: "none" };

export function Squiggle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 20" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 10 Q 17 -2 32 10 T 62 10 T 92 10 T 118 10" className="animate-draw" />
    </svg>
  );
}

export function Star({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z" />
    </svg>
  );
}

export function MusicNote({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18 V5 L20 3 V16" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

export function Lightning({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M13 2 L4 14 H11 L9 22 L20 9 H13 Z" />
    </svg>
  );
}

export function Magnet({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6 V18 a10 10 0 0 0 20 0 V6 H20 V18 a4 4 0 0 1 -8 0 V6 Z" />
      <line x1="6" y1="10" x2="12" y2="10" />
      <line x1="20" y1="10" x2="26" y2="10" />
    </svg>
  );
}

/** Scattered floating doodles for backgrounds. */
export function ScatterDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-ink">
      <Star className="h-8 w-8 animate-float" style={{ ...COMMON, top: "8%", left: "6%", animationDelay: "0s" }} />
      <MusicNote className="h-10 w-10 animate-float" style={{ ...COMMON, top: "20%", right: "8%", animationDelay: "0.5s" }} />
      <Lightning className="h-9 w-9 animate-float" style={{ ...COMMON, top: "55%", left: "4%", animationDelay: "1s" }} />
      <Squiggle className="h-5 w-32" style={{ ...COMMON, top: "40%", right: "12%" }} />
      <Star className="h-6 w-6 animate-float" style={{ ...COMMON, bottom: "12%", right: "20%", animationDelay: "1.5s" }} />
      <Magnet className="h-12 w-12 animate-float" style={{ ...COMMON, bottom: "18%", left: "10%", animationDelay: "0.8s" }} />
      <MusicNote className="h-7 w-7 animate-float" style={{ ...COMMON, top: "70%", right: "30%", animationDelay: "0.3s" }} />
    </div>
  );
}