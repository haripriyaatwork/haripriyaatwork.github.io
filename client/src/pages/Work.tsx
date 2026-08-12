/* Work archive: verified LinkedIn writing is linked; all unverified work remains explicitly empty. */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "../App";

const categories = ["ALL", "WRITING", "STRATEGY", "VIDEO", "DESIGN", "ACADEMICS", "OTHER"];
const writing = ["SOCIAL MEDIA", "JOURNALISM", "SUBSTACK", "LINKEDIN", "LINKEDIN FOR OTHERS", "X", "WEBSITE COPY", "SEO", "AEO", "POETRY"];
const posts = [
  { number: "01", title: "Communication is the KEY", excerpt: "Communication is not a master key. Every audience is a different lock, and every lock demands its own carefully crafted key.", impressions: "3,258 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_communication-is-the-key-not-just-activity-7421027789933457408-Kzsd", tag: "COMMUNICATION" },
  { number: "02", title: "LIE LinkedIn keeps repeating: Pick a niche. I WON’T.", excerpt: "A jack of all trades is not lesser. Sometimes it is better than being a master of one.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_lie-linkedin-keeps-repeating-pick-a-niche-activity-7406898812314828800-cWP-", tag: "IDENTITY" },
  { number: "03", title: "MY ADVICE: WRITE A BAD PROMPT!!!", excerpt: "You do not need a perfect start. You need a starting point you can critique.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_my-advice-write-a-bad-prompt-yes-activity-7455818283372638208-MS_P", tag: "CREATION" },
];

export default function Work() {
  const [active, setActive] = useState("ALL");
  const showPosts = active === "ALL" || active === "WRITING" || active === "LINKEDIN";
  return <section className="page container work-page">
    <div className="page-intro"><span className="eyebrow">03 / Exploration</span><h1>A PLETHORA<br /><em>OF WORK.</em></h1><p className="hindi-line">आप बताइए कि आपको क्या चाहिए.</p></div>
    <div className="archive-controls"><div className="filter-row">{categories.map((item) => <button className={active === item ? "filter active" : "filter"} onClick={() => setActive(item)} key={item}>{item}</button>)}</div><span className="eyebrow">Archive / {active}</span></div>
    {showPosts ? <div className="linkedin-archive"><div className="archive-section-heading"><span className="eyebrow">Verified LinkedIn writing</span><p>Posts written for my own voice, with public links and the impressions supplied in the archive.</p></div><div className="linkedin-post-grid">{posts.map((post) => <article className="linkedin-post-card" key={post.number}><span className="project-number">[{post.number}] / LINKEDIN</span><span className="post-tag">{post.tag}</span><h2>{post.title}</h2><p>{post.excerpt}</p><div className="post-meta"><span>{post.impressions}</span><a href={post.href} target="_blank" rel="noreferrer">Read on LinkedIn <ArrowUpRight size={15} /></a></div></article>)}</div></div> : <div className="archive-board"><div className="archive-card feature"><span className="project-number">[01] / {active}</span><h2>[PROJECT TITLE]</h2><EmptyState label="THUMBNAIL TO BE ADDED" detail="Description, platform, date, tags, and link will be added here." /></div><div className="archive-card"><span className="project-number">[02] / {active}</span><h3>[WORK TO BE ADDED]</h3><EmptyState label="CASE STUDY COMING SOON" /></div><div className="archive-card"><span className="project-number">[03] / {active}</span><h3>[WORK TO BE ADDED]</h3><EmptyState label="ARTICLE / VIDEO / DESIGN TO BE ADDED" /></div></div>}
    <div className="writing-index"><span className="eyebrow">Writing subcategories</span><div>{writing.map((item) => <span key={item}>{item}</span>)}</div></div>
    <div className="case-study-skeleton"><span className="eyebrow">Strategy / case study architecture</span><div className="case-grid">{[1, 2, 3, 4].map((item) => <div key={item}><span className="project-number">CASE STUDY 0{item}</span><h3>[PROJECT TO BE ADDED]</h3><p>THE PROBLEM · THE OBJECTIVE · THE CONTEXT · MY ROLE · THE RESEARCH · THE THINKING · THE STRATEGY · THE EXECUTION · THE RESULTS · WHAT I LEARNED</p></div>)}</div></div>
    <div className="kaafila"><span className="eyebrow">Special project placeholder</span><h2>KAAFILA — COMMUNICATION HEAD</h2><EmptyState label="FULL CASE STUDY TO BE PROVIDED" /></div>
  </section>;
}
