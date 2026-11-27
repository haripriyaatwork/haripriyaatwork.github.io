import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export type BookletArticle = {
  title: string;
  href: string;
  excerpt?: string;
  label?: string;
};

type ArticleBookletProps = {
  anchorId?: string;
  title: string;
  source: string;
  description: string;
  articles: BookletArticle[];
};

export function ArticleBooklet({ anchorId, title, source, description, articles }: ArticleBookletProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  if (articles.length === 0) return null;

  const currentArticle = articles[activeIndex];
  const moveTo = (index: number) => setActiveIndex(Math.max(0, Math.min(articles.length - 1, index)));

  return <>
    <section className="article-booklet" id={anchorId}>
      <button className="article-booklet-cover" type="button" onClick={() => { setActiveIndex(0); setOpen(true); }} aria-label={`Open booklet: ${title}`}>
        <span className="article-booklet-cover-edge" aria-hidden="true" />
        <span className="article-booklet-cover-top"><span>{source}</span><span>{String(articles.length).padStart(2, "0")} PIECES</span></span>
        <span className="article-booklet-cover-title">{title}</span>
        <span className="article-booklet-cover-description">{description}</span>
        <span className="article-booklet-cover-bottom"><span>OPEN BOOKLET</span><BookOpen size={18} aria-hidden="true" /></span>
      </button>
    </section>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="article-booklet-dialog" showCloseButton={false}>
        <header className="article-booklet-header">
          <div>
            <span className="eyebrow">{source} / BOOKLET</span>
            <DialogTitle className="article-booklet-title">{title}</DialogTitle>
            <DialogDescription className="article-booklet-description">Choose a title from the contents to view its article details and open the original source.</DialogDescription>
          </div>
          <DialogClose className="article-booklet-close" aria-label="Close booklet"><X size={19} /></DialogClose>
        </header>

        <div className="article-booklet-reader">
          <nav className="article-booklet-contents" aria-label={`${title} contents`}>
            <span className="article-booklet-contents-label">CONTENTS <span>{String(articles.length).padStart(2, "0")}</span></span>
            <div className="article-booklet-contents-list">
              {articles.map((article, index) => <button className={`article-booklet-entry ${index === activeIndex ? "is-active" : ""}`} type="button" key={`${article.href}-${index}`} onClick={() => moveTo(index)} aria-current={index === activeIndex ? "page" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{article.title}</strong>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>)}
            </div>
          </nav>

          <article className="article-booklet-page" aria-live="polite">
            <div className="article-booklet-page-top"><span>{source.toUpperCase()}</span><span>{String(activeIndex + 1).padStart(2, "0")} / {String(articles.length).padStart(2, "0")}</span></div>
            <div className="article-booklet-page-copy">
              <span className="eyebrow">{currentArticle.label || "SELECTED ARTICLE"}</span>
              <h2>{currentArticle.title}</h2>
              <p>{currentArticle.excerpt || "Open the original published article to read the complete piece."}</p>
              <a className="article-booklet-source-link" href={currentArticle.href} target="_blank" rel="noreferrer">Read the original on {source} <ArrowUpRight size={16} /></a>
            </div>
            <footer className="article-booklet-page-nav">
              <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft size={16} /> Previous</button>
              <span>PAGE {String(activeIndex + 1).padStart(2, "0")}</span>
              <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === articles.length - 1}>Next <ArrowRight size={16} /></button>
            </footer>
          </article>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}
