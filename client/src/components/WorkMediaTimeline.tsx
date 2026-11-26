import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type WorkMediaItem = {
  title: string;
  href: string;
  note?: string;
  platform?: string;
};

type WorkMediaTimelineProps = {
  items: WorkMediaItem[];
  kind: "design" | "video";
};

type InstagramWindow = Window & {
  instgrm?: { Embeds?: { process?: () => void } };
};

export function WorkMediaTimeline({ items, kind }: WorkMediaTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const current = items[activeIndex];

  useEffect(() => {
    if (!current?.href || !/instagram\.com/i.test(current.href)) return;
    const timer = window.setTimeout(() => {
      (window as InstagramWindow).instgrm?.Embeds?.process?.();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [current?.href]);

  if (!current) return null;

  const isInstagram = /instagram\.com/i.test(current.href);
  const embedPermalink = `${current.href}${current.href.includes("?") ? "&" : "?"}utm_source=ig_embed&utm_campaign=loading`;
  const selectItem = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return <div className={`media-showcase media-showcase--${kind}`}>
    <div className="media-showcase-window" role="region" aria-label={`${kind === "design" ? "Design" : "Video editing"} project viewer`} aria-live="polite">
      <div className="media-showcase-stage">
        <div key={current.href} className={`media-showcase-slide ${direction > 0 ? "is-entering-next" : "is-entering-previous"}`}>
          {isInstagram ? <div className={`instagram-embed-frame media-showcase-embed ${kind === "video" ? "media-showcase-embed--video" : ""}`}>
            <blockquote className="instagram-media" data-instgrm-permalink={embedPermalink} data-instgrm-version="14">
              <a href={current.href} target="_blank" rel="noreferrer" aria-label={`Open ${current.title} on Instagram`}></a>
            </blockquote>
            <a className={`embed-overlay ${kind === "video" ? "video-overlay" : "design-overlay"}`} href={current.href} target="_blank" rel="noreferrer" aria-label={`${kind === "video" ? "Play" : "View"} ${current.title}`}>
              <span className={kind === "video" ? "play-symbol" : "tap-symbol"}>{kind === "video" ? "▶" : "☝︎"}</span>
              <span>{kind === "video" ? "Click to play" : "Click to see"}</span>
            </a>
          </div> : <div className="media-showcase-external">
            <span className="eyebrow">External project / {current.platform || "LINK"}</span>
            <h3>{current.title}</h3>
            <p>{current.note}</p>
            <a href={current.href} target="_blank" rel="noreferrer">Open the original post <ArrowUpRight size={15} /></a>
          </div>}
        </div>
      </div>
      <div className="media-showcase-meta">
        <span className="project-number">{kind === "design" ? "DESIGN" : "VIDEO EDITING"} / {current.platform || (isInstagram ? "INSTAGRAM" : "EXTERNAL")}</span>
        <h2>{current.title}</h2>
        {current.note && <p>{current.note}</p>}
        <a className="media-showcase-link" href={current.href} target="_blank" rel="noreferrer">
          {kind === "video" ? "Open Reel" : "Open project"} <ArrowUpRight size={15} />
        </a>
      </div>
    </div>

    <div className="media-timeline-heading">
      <span className="eyebrow">{kind === "design" ? "Design archive" : "Video editing archive"} / {String(activeIndex + 1).padStart(2, "0")} of {String(items.length).padStart(2, "0")}</span>
      <span className="media-timeline-hint">Scroll or swipe to explore <span aria-hidden="true">→</span></span>
    </div>
    <nav className="media-timeline-track" aria-label={`${kind === "design" ? "Design" : "Video editing"} project timeline`}>
      {items.map((item, index) => <button
        type="button"
        className={`media-timeline-stop ${activeIndex === index ? "active" : ""}`}
        aria-pressed={activeIndex === index}
        aria-label={`Show ${item.title}, item ${index + 1} of ${items.length}`}
        onClick={() => selectItem(index)}
        key={item.href}
      >
        <span className="media-timeline-dot" aria-hidden="true" />
        <small>{String(index + 1).padStart(2, "0")} · {item.platform || (item.href.includes("instagram.com") ? "INSTAGRAM" : "PROJECT")}</small>
        <strong>{item.title}</strong>
      </button>)}
    </nav>
  </div>;
}
