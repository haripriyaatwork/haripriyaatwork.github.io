/* Editorial Signal page: oversized type, portrait-led hero, rose rules, and asymmetrical project rhythm. */
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";

const projects = [
  { slug: "signal-noise", number: "01", title: "Signal / Noise", type: "Communication strategy · 2025", image: "/manus-storage/communicate-signal_f9c2cb38.png", tone: "pink" },
  { slug: "archive-project", number: "02", title: "The Archive Project", type: "Editorial identity · 2024", image: "/manus-storage/communicate-archive_d375ac4d.png", tone: "cream" },
];

export default function Home() {
  return <>
    <section className="hero container">
      <div className="hero-kicker"><span className="signal-cross">+</span><span>Follow along to learn to communicate.</span><span>DM for collaborations.</span></div>
      <div className="hero-copy"><p className="eyebrow">Creative communication · New Delhi</p><h1>You need to <em>stop posting.</em><br />Start <strong>communicating.</strong></h1><p className="hero-intro">I build the thinking, language, and visual systems that help good work become impossible to misunderstand.</p><div className="hero-actions"><Link href="/work" className="button button-rose">See selected work <ArrowUpRight size={17} /></Link><Link href="/about" className="text-link">The point of view <ArrowDownRight size={16} /></Link></div></div>
      <div className="hero-portrait"><img src="/manus-storage/communicate-hero_4e8c34d2.png" alt="Portrait of the communication strategist" /><div className="portrait-stamp">04<br /><span>years of<br />making sense</span></div></div>
      <div className="hero-stats"><span>10L+ impressions</span><span>Building communicate</span><span>10+ industries</span></div>
    </section>
    <section className="statement-band"><div className="container statement-grid"><span className="eyebrow">01 / The signal</span><p>Communication is not more content. It is the <i>right</i> thought, in the right shape, reaching the right person.</p><Link href="/about" className="round-arrow"><ArrowUpRight size={20} /></Link></div></section>
    <section className="work-preview container"><div className="section-heading"><div><span className="eyebrow">02 / Selected work</span><h2>Things made<br /><em>to travel.</em></h2></div><Link href="/work" className="text-link">View the archive <ArrowUpRight size={16} /></Link></div><div className="project-list">{projects.map((project) => <Link href={`/work/${project.slug}`} className={`project-card ${project.tone}`} key={project.slug}><div className="project-image"><img src={project.image} alt="" /></div><div className="project-caption"><span className="project-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.type}</p></div><ArrowUpRight size={20} /></div></Link>)}</div></section>
    <section className="process container"><span className="eyebrow">03 / How I work</span><div className="process-grid"><div><span className="step-number">01</span><h3>Listen for the tension.</h3><p>Before the strategy, there is a question hiding inside the brief. We find it first.</p></div><div><span className="step-number">02</span><h3>Find the sharp line.</h3><p>We turn the thinking into a point of view people can repeat, remember, and use.</p></div><div><span className="step-number">03</span><h3>Make it move.</h3><p>Words, images, formats, systems—the work has to leave the room and do its job.</p></div></div></section>
    <section className="cta-band"><div className="container cta-inner"><span className="eyebrow">Have a messy brief?</span><h2>Bring me the<br /><em>real version.</em></h2><Link href="/contact" className="button button-light">Start a conversation <ArrowUpRight size={17} /></Link><div className="cta-plus"><Plus size={44} strokeWidth={1} /></div></div></section>
  </>;
}
