/* App shell: editorial navigation with a deliberate loading → colour → site introduction. */
import { Route, Switch, Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import Home from "./pages/Home";
import WhoIAm from "./pages/WhoIAm";
import Work from "./pages/Work";
import Thinking from "./pages/Thinking";
import Results from "./pages/Results";
import Resume from "./pages/Resume";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const navItems = [
  { href: "/", label: "Home", group: "explore" },
  { href: "/who-i-am", label: "Who I am", group: "explore" },
  { href: "/work", label: "Work", group: "explore" },
  { href: "/thinking", label: "Thinking", group: "explore" },
  { href: "/results", label: "Results", group: "proof" },
  { href: "/resume", label: "Resume", group: "proof" },
  { href: "/connect", label: "Let's Talk", group: "proof", cta: true },
];

const palettes = [
  { id: "pink", label: "Pink", color: "#d95b79", deep: "#6d263e", rgb: "217,91,121", deepRgb: "109,38,62" },
  { id: "orange", label: "Orange", color: "#e27b52", deep: "#74351f", rgb: "226,123,82", deepRgb: "116,53,31" },
  { id: "yellow", label: "Yellow", color: "#d7ac4d", deep: "#6d5420", rgb: "215,172,77", deepRgb: "109,84,32" },
  { id: "blue", label: "Blue / Purple", color: "#7c73e6", deep: "#322d72", rgb: "124,115,230", deepRgb: "50,45,114" },
];

type IntroStage = "loading" | "palette" | "transition" | "complete";

export function EmptyState({ label = "CONTENT TO BE PROVIDED", detail = "This space is designed and ready for the real material." }: { label?: string; detail?: string }) {
  return <div className="empty-state"><span className="empty-bracket">[</span><div><strong>{label}</strong><p>{detail}</p></div><span className="empty-bracket">]</span></div>;
}

function HeartCursor({ pickerOpen = false }: { pickerOpen?: boolean }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const targetPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetPosition.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
    };
    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest?.("a, button, input, textarea, [role='button']")) setHovering(true);
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (!(event.relatedTarget as HTMLElement | null)?.closest?.("a, button, input, textarea, [role='button']")) setHovering(false);
    };
    const handlePointerLeave = () => setVisible(false);
    let rendered = { ...targetPosition.current };
    let animationFrame = 0;
    const animate = () => {
      rendered = { x: rendered.x + (targetPosition.current.x - rendered.x) * 0.2, y: rendered.y + (targetPosition.current.y - rendered.y) * 0.2 };
      setPosition(rendered);
      setTrail((current) => [{ x: rendered.x, y: rendered.y }, ...current].slice(0, 12));
      animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <><span className={`heart-trail${visible ? " is-visible" : ""}`} aria-hidden="true">{trail.map((point, index) => <i key={`${point.x}-${point.y}-${index}`} style={{ left: point.x, top: point.y, opacity: (12 - index) / 30, transform: `translate(-50%, -50%) scale(${(12 - index) / 16})` }}>♥</i>)}</span><span className={`heart-cursor${visible ? " is-visible" : ""}${hovering ? " is-hovering" : ""}${pickerOpen ? " is-picker" : ""}`} style={{ left: position.x, top: position.y }} aria-hidden="true">♥</span></>;
}

function PalettePicker({ onChoose }: { onChoose: (paletteId: string, event: MouseEvent<HTMLButtonElement>) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])") ?? []);
    focusable()[0]?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }
      if (event.key !== "Tab") return;
      const choices = focusable();
      if (choices.length === 0) return;
      const first = choices[0];
      const last = choices[choices.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected && !previousFocus.closest("[inert]")) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return <div className="palette-picker" role="dialog" aria-modal="true" aria-labelledby="palette-title">
    <div className="palette-picker-card" ref={dialogRef}>
      <span className="palette-kicker">A SMALL FIRST CHOICE</span>
      <h2 id="palette-title">
        <span className="sr-only">Before we begin, choose a colour that feels like you.</span>
        <span className="palette-title-line" aria-hidden="true">{["Before", "we begin,"].map((word, index) => <span className="palette-title-word" style={{ "--word-delay": `${160 + index * 120}ms` } as CSSProperties} key={word}>{word}</span>)}</span>
        <span className="palette-title-line palette-title-line--accent" aria-hidden="true">{["choose a colour", "that feels like you."].map((word, index) => <span className="palette-title-word" style={{ "--word-delay": `${400 + index * 120}ms` } as CSSProperties} key={word}>{word}</span>)}</span>
      </h2>
      <p className="palette-instruction">Pick a shade to set the mood. Your space will bloom into it.</p>
      <div className="palette-options">
        {palettes.map((palette, index) => <button key={palette.id} className="palette-option" style={{ "--swatch-delay": `${620 + index * 110}ms` } as CSSProperties} type="button" aria-label={`Choose ${palette.label}`} onClick={(event) => onChoose(palette.id, event)}><span className="palette-swatch" style={{ backgroundColor: palette.color }} /></button>)}
      </div>
      <span className="palette-hint" aria-hidden="true">Choose your colour to enter</span>
    </div>
  </div>;
}

function PaletteTransition({ style, onComplete }: { style: CSSProperties; onComplete: () => void }) {
  return <div className="palette-transition" role="status" aria-label="Revealing your colour palette" onAnimationEnd={(event) => { if (event.target === event.currentTarget) onComplete(); }}>
    <span className="palette-transition-orb" style={style} aria-hidden="true" />
    <span className="palette-transition-copy" aria-hidden="true">Your colour. Your canvas.</span>
  </div>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [introStage, setIntroStage] = useState<IntroStage>("loading");
  const [paletteId, setPaletteId] = useState("pink");
  const [revealStyle, setRevealStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroStage("palette"), 950);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const palette = palettes.find((item) => item.id === paletteId) || palettes[0];
    document.documentElement.dataset.palette = palette.id;
    document.documentElement.style.setProperty("--pink", palette.color);
    document.documentElement.style.setProperty("--rose", palette.color);
    document.documentElement.style.setProperty("--deep", palette.deep);
    document.documentElement.style.setProperty("--pink-rgb", palette.rgb);
    document.documentElement.style.setProperty("--deep-rgb", palette.deepRgb);
  }, [paletteId]);

  const choosePalette = (nextPaletteId: string, event: MouseEvent<HTMLButtonElement>) => {
    const palette = palettes.find((item) => item.id === nextPaletteId) || palettes[0];
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const farthestCorner = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    );
    setRevealStyle({
      "--reveal-x": `${x}px`,
      "--reveal-y": `${y}px`,
      "--reveal-diameter": `${Math.ceil(farthestCorner * 2.1)}px`,
      "--reveal-color": palette.color,
    } as CSSProperties);
    setPaletteId(nextPaletteId);
    setIntroStage(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "complete" : "transition");
  };

  const introActive = introStage !== "complete";
  const siteContentClass = introStage === "transition"
    ? "site-content site-content--revealing"
    : introActive
      ? "site-content site-content--hidden"
      : "site-content";

  return <div className="site-shell">
    <HeartCursor pickerOpen={introStage === "palette"} />
    <div className={siteContentClass} aria-hidden={introActive} inert={introActive || undefined}>
      <header className="site-header"><Link href="/" className="brand-lockup" onClick={() => setOpen(false)}><span>HARIPRIYA<br /><b>MISHRA</b></span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav className={open ? "main-nav is-open" : "main-nav"}>{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={item.cta ? "nav-cta" : location === item.href ? "nav-link active" : "nav-link"}>{item.label}{item.cta && <ArrowUpRight size={14} />}</Link>)}</nav></header>
      <main tabIndex={-1}>{children}</main>
      <footer className="site-footer"><div><span className="eyebrow">Haripriya Mishra</span><p>Communicator · Writer · Researcher · Strategist · Creator</p></div><div className="footer-nav">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div className="footer-meta"><button className="palette-reopen" type="button" onClick={() => setIntroStage("palette")}>Change colour</button><small>© 2026 Haripriya Mishra</small></div></footer>
    </div>
    {introStage === "loading" && <div className="site-loader" role="status" aria-label="Loading portfolio"><div className="loader-heart">♥</div><span>HARIPRIYA AT WORK</span></div>}
    {introStage === "palette" && <PalettePicker onChoose={choosePalette} />}
    {introStage === "transition" && <PaletteTransition style={revealStyle} onComplete={() => setIntroStage("complete")} />}
  </div>;
}

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/who-i-am" component={WhoIAm} /><Route path="/work" component={Work} /><Route path="/thinking" component={Thinking} /><Route path="/results" component={Results} /><Route path="/resume" component={Resume} /><Route path="/connect" component={Connect} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider>; }
