/* Thinking archive: essays and public writing stay evidence-first; poetry uses preserved line breaks in a focused literary reader. */
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import poems from "../data/poems.json";

const sections = ["ESSAYS", "LINKEDIN WRITING", "SUBSTACK"];
const linkedPosts = [
  { title: "Communication is the KEY", note: "Clarity, intent, audience, and the work of making a message land.", impressions: "3,258 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_communication-is-the-key-not-just-activity-7421027789933457408-Kzsd" },
  { title: "Pick a niche. I WON’T.", note: "Range is not a lack of focus; it is depth across mediums.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_lie-linkedin-keeps-repeating-pick-a-niche-activity-7406898812314828800-cWP-" },
  { title: "Write a bad prompt", note: "A rough first attempt gives you something to critique and shape.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_my-advice-write-a-bad-prompt-yes-activity-7455818283372638208-MS_P" },
];

export default function Thinking() {
  const [selectedPoem, setSelectedPoem] = useState(0);
  const poem = poems[selectedPoem];
  useEffect(() => { if (window.location.hash.toLowerCase() === "#poetry") { const timer = window.setTimeout(() => document.getElementById("poetry")?.scrollIntoView({ behavior: "auto", block: "start" }), 120); return () => window.clearTimeout(timer); } }, []);
  return <section className="page container thinking-page">
    <div className="page-intro"><span className="eyebrow">04 / Exploration</span><h1>THINGS I<br /><em>THINK ABOUT.</em></h1><p>Work is what I make for a brief. Thinking is what stays with me after.</p></div>
    <div className="thinking-grid">{sections.map((section, i) => <article className={i === 1 ? "thinking-card featured" : "thinking-card"} key={section}><span className="project-number">0{i + 1}</span><h2>{section}</h2>{section === "LINKEDIN WRITING" ? <div className="thinking-link-list">{linkedPosts.map((post) => <a className="thinking-link-card" href={post.href} target="_blank" rel="noreferrer" key={post.href}><strong>{post.title}</strong><span>{post.note}</span><small>{post.impressions} <ArrowUpRight size={14} /></small></a>)}</div> : <div className="thinking-link-list"><a className="thinking-link-card essay-artifact" href="https://www.instagram.com/p/DXq2YExjbd9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer"><strong>The Aesthetics of Obedience</strong><span>How Authority Trains Us to Bend Gracefully</span><small>Haripriya Mishra · Jan 27, 2026 <ArrowUpRight size={14} /></small></a><p className="artifact-note">A poem that later unfolded into an essay, shared through a visual carousel. It explores how power becomes acceptable by presenting itself as calm, reasonable, and necessary.</p></div>}</article>)}</div>
    <section className="poetry-archive" id="poetry"><div className="poetry-archive-heading"><div><span className="eyebrow">05 / Poetry</span><h2>A quieter<br /><em>archive.</em></h2></div></div><div className="poetry-layout"><nav className="poem-index" aria-label="Poem titles">{poems.map((item, index) => <button className={selectedPoem === index ? "active" : ""} onClick={() => setSelectedPoem(index)} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}</nav><article className="poem-reader"><span className="project-number">POEM / {String(selectedPoem + 1).padStart(2, "0")}</span><h3>{poem.title}</h3>{poem.titleNote && <small>{poem.titleNote}</small>}<div className="poem-body">{poem.body}</div></article></div></section>
  </section>;
}
