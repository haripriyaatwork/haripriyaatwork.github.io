/* Haripriya Mishra archive system: black foundation, white editorial type, pink route lines, intentional empty states. */
import { Route, Switch, Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
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
  { href: "/", label: "Home", number: "01", group: "explore" },
  { href: "/who-i-am", label: "Who I am", number: "02", group: "explore" },
  { href: "/work", label: "Work", number: "03", group: "explore" },
  { href: "/thinking", label: "Thinking", number: "04", group: "explore" },
  { href: "/results", label: "Results", number: "05", group: "proof" },
  { href: "/resume", label: "Resume", number: "06", group: "proof" },
  { href: "/connect", label: "Connect", number: "07", group: "proof" },
];

export function EmptyState({ label = "CONTENT TO BE PROVIDED", detail = "This space is designed and ready for the real material." }: { label?: string; detail?: string }) {
  return <div className="empty-state"><span className="empty-bracket">[</span><div><strong>{label}</strong><p>{detail}</p></div><span className="empty-bracket">]</span></div>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return <div className="site-shell"><aside className="editorial-rail"><span className="rail-mark">HM</span><span className="rail-line" /><span className="rail-label">{navItems.find((item) => item.href === location)?.number || "HM"} / Haripriya Mishra</span></aside><header className="site-header"><Link href="/" className="brand-lockup" onClick={() => setOpen(false)}><span className="brand-monogram">HM</span><span>HARIPRIYA<br /><b>MISHRA</b></span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button><nav className={open ? "main-nav is-open" : "main-nav"}>{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={location === item.href ? "nav-link active" : "nav-link"}><span>{item.number}</span>{item.label}</Link>)}<Link href="/connect" className="nav-cta" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={14} /></Link></nav></header><main>{children}</main><footer className="site-footer"><div><span className="eyebrow">Haripriya Mishra</span><p>Communicator · Writer · Researcher · Strategist · Creator</p></div><div className="footer-nav">{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><small>© 2026 Haripriya Mishra</small></footer></div>;
}
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/who-i-am" component={WhoIAm} /><Route path="/work" component={Work} /><Route path="/thinking" component={Thinking} /><Route path="/results" component={Results} /><Route path="/resume" component={Resume} /><Route path="/connect" component={Connect} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider>; }
