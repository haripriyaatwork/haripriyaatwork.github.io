import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type WorkMediaItem = {
  title: string;
  href: string;
  note?: string;
  platform?: string;
};

type WorkMediaCarouselProps = {
  items: WorkMediaItem[];
  kind: "design" | "video";
};

type InstagramWindow = Window & {
  instgrm?: { Embeds?: { process?: () => void } };
};

export function WorkMediaCarousel({ items, kind }: WorkMediaCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      (window as InstagramWindow).instgrm?.Embeds?.process?.();
    }, 120);
    return () => window.clearTimeout(timer);
  }, [items, kind]);

  if (items.length === 0) return null;

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    track.scrollTo({
      left: track.clientWidth * nextIndex,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.max(0, Math.min(items.length - 1, index)));
  };

  const isVideo = kind === "video";

  return <div className={`media-showcase media-showcase--${kind}`}>
    <div className="media-carousel-shell">
      <div
        ref={trackRef}
        className="media-carousel-window"
        role="region"
        aria-label={`${isVideo ? "Video editing reels" : "Graphic design posts"}; swipe or scroll to browse`}
        onScroll={handleScroll}
      >
        {items.map((item) => {
          const isInstagram = /instagram\.com/i.test(item.href);
          const embedPermalink = `${item.href}${item.href.includes("?") ? "&" : "?"}utm_source=ig_embed&utm_campaign=loading`;
          return <div className={`media-carousel-slide ${isVideo ? "media-carousel-slide--video" : "media-carousel-slide--design"}`} key={item.href}>
            {isInstagram ? <div className={`instagram-embed-frame media-carousel-embed ${isVideo ? "media-carousel-embed--video" : ""}`}>
              <blockquote className="instagram-media" data-instgrm-permalink={embedPermalink} data-instgrm-version="14">
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} on Instagram`}></a>
              </blockquote>
              <a className={`embed-overlay ${isVideo ? "video-overlay" : "design-overlay"}`} href={item.href} target="_blank" rel="noreferrer" aria-label={`${isVideo ? "Play" : "View"} ${item.title}`}>
                <span className={isVideo ? "play-symbol" : "tap-symbol"}>{isVideo ? "▶" : "☝︎"}</span>
                <span>{isVideo ? "Click to play" : "Click to see"}</span>
              </a>
            </div> : <a className="media-carousel-external" href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`}>
              <span className="eyebrow">External project / {item.platform || "LINK"}</span>
              <strong>{item.title}</strong>
              <span>Open the original post <ArrowUpRight size={15} /></span>
            </a>}
          </div>;
        })}
      </div>
      {items.length > 1 && <>
        <button className="media-carousel-control media-carousel-control--previous" type="button" aria-label="Previous project" disabled={activeIndex === 0} onClick={() => goToSlide(activeIndex - 1)}>
          <span aria-hidden="true">‹</span>
        </button>
        <button className="media-carousel-control media-carousel-control--next" type="button" aria-label="Next project" disabled={activeIndex === items.length - 1} onClick={() => goToSlide(activeIndex + 1)}>
          <span aria-hidden="true">›</span>
        </button>
      </>}
      <span className="sr-only" aria-live="polite">Item {activeIndex + 1} of {items.length}</span>
    </div>
  </div>;
}
