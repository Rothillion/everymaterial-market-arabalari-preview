import { useEffect, useState } from "react";

/** Thin fixed vertical scroll-progress track, desktop only — matches the approved mockup's rhythm cue. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="hidden lg:block fixed right-10 top-1/2 -translate-y-1/2 w-[2px] h-[150px] bg-navy/10 z-40"
      aria-hidden="true"
    >
      <div className="w-full bg-accent-deep transition-[height]" style={{ height: `${progress}%` }} />
    </div>
  );
}
