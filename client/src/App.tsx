/* App shell: clean editorial navigation with no numeric prefixes; the final Connect destination is presented once as Let's Talk. */
import { Route, Switch, Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
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
  { id: "pink", label: "Pink", color: "#d95b79", deep: "#6d263e", rgb: "217,91,121" },
  { id: "orange", label: "Orange", color: "#e27b52", deep: "#74351f", rgb: "226,123,82" },
  { id: "yellow", label: "Yellow", color: "#d7ac4d", deep: "#6d5420", rgb: "215,172,77" },
  { id: "blue", label: "Blue / Purple", color: "#7c73e6", deep: "#322d72", rgb: "124,115,230" },
];

export function EmptyState({ label = "CONTENT TO BE PROVIDED", detail = "This space is designed and ready for the real material." }: { label?: string; detail?: string }) {
  return <div className="empty-state"><span className="empty-bracket">[</span><div><strong>{label}</strong><p>{detail}</p></div><span className="empty-bracket">]</span></div>;
}

function HeartCursor({ pickerOpen = false }: { pickerOpen?: boolean }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setPosition({ x: event.clientX, y: event.clientY });
      setTrail((current) => [{ x: event.clientX, y: event.clientY }, ...current].slice(0, 7));
      setVisible(true);
    };
    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest?.("a, button, input, textarea, [role='button']")) setHovering(true);
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (!(event.relatedTarget as HTMLElement | null)?.closest?.("a, button, input, textarea, [role='button']")) setHovering(false);
    };
    const handlePointerLeave = () => setVisible(false);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return <><span className={`heart-trail${visible ? " is-visible" : ""}`} aria-hidden="true">{trail.map((point, index) => <i key={`${point.x}-${point.y}-${index}`} style={{ left: point.x, top: point.y, opacity: (7 - index) / 16, transform: `translate(-50%, -50%) scale(${(7 - index) / 18})` }}>♥</i>)}</span><span className={`heart-cursor${visible ? " is-visible" : ""}${hovering ? " is-hovering" : ""}${pickerOpen ? " is-picker" : ""}`} style={{ left: position.x, top: position.y }} aria-hidden="true">{pickerOpen ? "➤" : "♥"}</span></>;
}

function PalettePicker({ onChoose }: { onChoose: (paletteId: string) => void }) {
  return <div className="palette-picker" role="dialog" aria-modal="true" aria-labelledby="palette-title"><div className="palette-picker-card"><h2 id="palette-title">Hello, Human! Tell me you favourite colour</h2><div className="palette-options">{palettes.map((palette) => <button key={palette.id} className="palette-option" type="button" aria-label={`Choose ${palette.label}`} onClick={() => onChoose(palette.id)}><span className="palette-swatch" style={{ background: palette.color }} /></button>)}</div></div></div>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paletteId, setPaletteId] = useState("pink");
  const [showPalettePicker, setShowPalettePicker] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 900); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { const palette = palettes.find((item) => item.id === paletteId) || palettes[0]; document.documentElement.dataset.palette = palette.id; document.documentElement.style.setProperty("--pink", palette.color); document.documentElement.style.setProperty("--rose", palette.color); document.documentElement.style.setProperty("--deep", palette.deep); document.documentElement.style.setProperty("--pink-rgb", palette.rgb); }, [paletteId]);
  const choosePalette = (nextPaletteId: string) => { setPaletteId(nextPaletteId); setShowPalettePicker(false); };
  return <div className="site-shell"><HeartCursor pickerOpen={showPalettePicker && !loading} />{loading && <div className="site-loader" role="status" aria-label="Loading portfolio"><div className="loader-heart">♥</div><span>HARIPRIYA AT WORK</span></div>}{showPalettePicker && !loading && <PalettePicker onChoose={choosePalette} />}<header className="site-header"><Link href="/" className="brand-lockup" onClick={() => setOpen(false)}><span>HARIPRIYA<br /><b>MISHRA</b></span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav className={open ? "main-nav is-open" : "main-nav"}>{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={item.cta ? "nav-cta" : location === item.href ? "nav-link active" : "nav-link"}>{item.label}{item.cta && <ArrowUpRight size={14} />}</Link>)}</nav></header><main>{children}</main><footer className="site-footer"><div><span className="eyebrow">Haripriya Mishra</span><p>Communicator · Writer · Researcher · Strategist · Creator</p></div><div className="footer-nav">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div className="footer-meta"><button className="palette-reopen" type="button" onClick={() => setShowPalettePicker(true)}>Change colour</button><small>© 2026 Haripriya Mishra</small></div></footer></div>;
}
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/who-i-am" component={WhoIAm} /><Route path="/work" component={Work} /><Route path="/thinking" component={Thinking} /><Route path="/results" component={Results} /><Route path="/resume" component={Resume} /><Route path="/connect" component={Connect} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider>; }
