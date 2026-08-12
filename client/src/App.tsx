/* Editorial Signal system: charcoal surfaces, ivory type, Signal Rose accents, asymmetric editorial rhythm. */
import { Route, Switch, Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const navItems = [
  { href: "/", label: "Home", index: "01" },
  { href: "/work", label: "Selected work", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="site-shell">
      <aside className="editorial-rail" aria-label="Page orientation"><span className="rail-mark"><img src="/manus-storage/communicate-mark_eebb3fab.png" alt="" /></span><span className="rail-line" /><span className="rail-label">{location === "/" ? "01 / Home" : location.startsWith("/work") ? "02 / Work" : location === "/about" ? "03 / About" : "04 / Contact"}</span></aside>
      <header className="site-header">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <span className="brand-mark"><img src="/manus-storage/communicate-mark_eebb3fab.png" alt="" /></span><span className="brand-rule" aria-hidden="true" />
          <span>communicate<span className="rose-dot">.</span></span>
        </Link>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={location === item.href ? "nav-link active" : "nav-link"}><span>{item.index}</span>{item.label}</Link>)}
          <Link href="/contact" onClick={() => setOpen(false)} className="nav-cta">Let's talk <ArrowUpRight size={15} /></Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div><span className="eyebrow">Independent communication studio</span><p className="footer-line">Make the signal impossible to miss.</p></div>
        <div className="footer-meta"><span>© 2026 Communicate</span><span>New Delhi / Everywhere</span><a href="mailto:hello@communicate.studio">hello@communicate.studio</a></div>
      </footer>
    </div>
  );
}

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/work" component={Work} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/work/:slug" component={Project} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider>;
}
