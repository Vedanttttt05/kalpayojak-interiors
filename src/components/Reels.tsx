"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { reels, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";
import { LineReveal, RailArrows, SwipeProgress, fadeUp, staggerParent } from "./motion";

/* Short site walkthroughs that play quietly as they scroll into view */
export function Reels() {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section id="reels" className="overflow-hidden bg-forest py-20 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:flex md:items-end md:justify-between md:px-8">
        <div>
          <Reveal>
            <p className="eyebrow !text-sage">On site</p>
          </Reveal>
          <LineReveal
            className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] md:text-6xl"
            lines={[
              "Walk through",
              <em key="em" className="text-sand">
                the details
              </em>,
            ]}
          />
        </div>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70 md:mt-0">
            Finishes, light and joinery are best seen in motion — a few moments from recent handovers.
          </p>
        </Reveal>
      </div>

      <motion.div
        ref={railRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mt-14 md:gap-4 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))] md:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {reels.map((reel, i) => (
          <ReelCard key={reel.id} reel={reel} index={i} />
        ))}
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center gap-4 px-5 md:px-8">
        <SwipeProgress container={railRef} className="flex-1 !bg-cream/15 [&>div]:!bg-cream" />
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream/60 md:hidden">Swipe</span>
        <RailArrows container={railRef} className="border-cream/25 hover:bg-cream hover:text-forest" />
      </div>

      <Reveal className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <a
          href={whatsappLink("Hi Pooja! I saw your reels and would like something similar for my home.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-6 border-b border-cream/30 pb-2 text-xs font-medium uppercase tracking-[0.2em]"
        >
          Want this in your home?
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </section>
  );
}

function ReelCard({ reel, index }: { reel: (typeof reels)[number]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !paused && !reduce) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, paused, reduce]);

  return (
    <motion.figure variants={fadeUp} className="w-[58vw] max-w-[15rem] shrink-0 snap-start md:w-[14rem]">
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-sm bg-[#123f38]"
        aria-label={`${paused ? "Play" : "Pause"} video: ${reel.label}`}
      >
        <video
          ref={ref}
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 size-full object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <motion.span
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-black/25 backdrop-blur-sm"
          initial={false}
          animate={{ opacity: paused || reduce ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <PlayIcon className="size-3.5" />
        </motion.span>
      </button>
      <figcaption className="mt-3 flex items-baseline gap-2 text-sm">
        <span className="font-display italic text-sand">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-cream/85">{reel.label}</span>
      </figcaption>
    </motion.figure>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}
