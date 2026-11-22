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

export function EmptyState({ label = "CONTENT TO BE PROVIDED", detail = "This space is designed and ready for the real material." }: { label?: string; detail?: string }) {
  return <div className="empty-state"><span className="empty-bracket">[</span><div><strong>{label}</strong><p>{detail}</p></div><span className="empty-bracket">]</span></div>;
}

function HeartCursor() {
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

  return <><span className={`heart-trail${visible ? " is-visible" : ""}`} aria-hidden="true">{trail.map((point, index) => <i key={`${point.x}-${point.y}-${index}`} style={{ left: point.x, top: point.y, opacity: (7 - index) / 16, transform: `translate(-50%, -50%) scale(${(7 - index) / 18})` }}>♥</i>)}</span><span className={`heart-cursor${visible ? " is-visible" : ""}${hovering ? " is-hovering" : ""}`} style={{ left: position.x, top: position.y }} aria-hidden="true">♥</span></>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 900); return () => window.clearTimeout(timer); }, []);
  return <div className="site-shell"><HeartCursor />{loading && <div className="site-loader" role="status" aria-label="Loading portfolio"><div className="loader-heart">♥</div><span>HARIPRIYA AT WORK</span></div>}<header className="site-header"><Link href="/" className="brand-lockup" onClick={() => setOpen(false)}><span>HARIPRIYA<br /><b>MISHRA</b></span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav className={open ? "main-nav is-open" : "main-nav"}>{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={item.cta ? "nav-cta" : location === item.href ? "nav-link active" : "nav-link"}>{item.label}{item.cta && <ArrowUpRight size={14} />}</Link>)}</nav></header><main>{children}</main><footer className="site-footer"><div><span className="eyebrow">Haripriya Mishra</span><p>Communicator · Writer · Researcher · Strategist · Creator</p></div><div className="footer-nav">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><small>© 2026 Haripriya Mishra</small></footer></div>;
}
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/who-i-am" component={WhoIAm} /><Route path="/work" component={Work} /><Route path="/thinking" component={Thinking} /><Route path="/results" component={Results} /><Route path="/resume" component={Resume} /><Route path="/connect" component={Connect} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider>; }
