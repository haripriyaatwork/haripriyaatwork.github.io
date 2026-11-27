/* Thinking archive: essays and public writing stay evidence-first; poetry uses preserved line breaks in a focused literary reader. */
import { useEffect, useState } from "react";
import { ArticleBooklet } from "../components/ArticleBooklet";
import poems from "../data/poems.json";

const essayArticles = [
  {
    title: "The Aesthetics of Obedience",
    href: "https://www.instagram.com/p/DXq2YExjbd9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    excerpt: "A poem that later unfolded into an essay, shared through a visual carousel. It explores how power becomes acceptable by presenting itself as calm, reasonable, and necessary.",
    label: "VISUAL ESSAY",
  },
];

const linkedPosts = [
  { title: "Communication is the KEY", note: "Clarity, intent, audience, and the work of making a message land.", impressions: "3,258 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_communication-is-the-key-not-just-activity-7421027789933457408-Kzsd" },
  { title: "Pick a niche. I WON’T.", note: "Range is not a lack of focus; it is depth across mediums.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_lie-linkedin-keeps-repeating-pick-a-niche-activity-7406898812314828800-cWP-" },
  { title: "Write a bad prompt", note: "A rough first attempt gives you something to critique and shape.", impressions: "2,502 impressions", href: "https://www.linkedin.com/posts/haripriyamishra2301_my-advice-write-a-bad-prompt-yes-activity-7455818283372638208-MS_P" },
];

export default function Thinking() {
  const [selectedPoem, setSelectedPoem] = useState(0);
  const poem = poems[selectedPoem];

  useEffect(() => {
    if (window.location.hash.toLowerCase() === "#poetry") {
      const timer = window.setTimeout(() => document.getElementById("poetry")?.scrollIntoView({ behavior: "auto", block: "start" }), 120);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return <section className="page container thinking-page">
    <div className="page-intro">
      <span className="eyebrow">04 / Exploration</span>
      <h1>THINGS I<br /><em>THINK ABOUT.</em></h1>
      <p>Work is what I make for a brief. Thinking is what stays with me after.</p>
    </div>

    <section className="thinking-booklet-grid" aria-label="Writing collections">
      <ArticleBooklet
        title="Essays"
        source="Instagram"
        description="A visual essay about authority, obedience, and how power becomes acceptable."
        articles={essayArticles}
      />
      <ArticleBooklet
        title="LinkedIn Writing"
        source="LinkedIn"
        description="Short reflections on communication, identity, and making better prompts."
        articles={linkedPosts.map((post) => ({
          title: post.title,
          href: post.href,
          excerpt: `${post.note} ${post.impressions}.`,
          label: "LINKEDIN WRITING",
        }))}
      />
      <ArticleBooklet
        title="Substack"
        source="Instagram"
        description="Longer-form thinking and essay work, collected in a small reading shelf."
        articles={essayArticles}
      />
    </section>

    <section className="poetry-archive" id="poetry">
      <div className="poetry-archive-heading"><div><span className="eyebrow">05 / Poetry</span><h2>A quieter<br /><em>archive.</em></h2></div></div>
      <div className="poetry-layout">
        <nav className="poem-index" aria-label="Poem titles">
          {poems.map((item, index) => <button className={selectedPoem === index ? "active" : ""} onClick={() => setSelectedPoem(index)} key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
          </button>)}
        </nav>
        <article className="poem-reader">
          <span className="project-number">POEM / {String(selectedPoem + 1).padStart(2, "0")}</span>
          <h3>{poem.title}</h3>
          {poem.titleNote && <small>{poem.titleNote}</small>}
          <div className="poem-body">{poem.body}</div>
        </article>
      </div>
    </section>
  </section>;
}
