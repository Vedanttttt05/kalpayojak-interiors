"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

/* Headline lines slide up from behind a mask, one after another */
const lineParent: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.09, delayChildren: delay } }),
};
const lineChild: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

export function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const MotionTag = motion[Tag];
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <MotionTag className={className} variants={lineParent} initial="hidden" custom={delay} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className="block" variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* Number that counts up once it scrolls into view */
export function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* Thin reading-progress line */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className={`origin-left ${className ?? ""}`} style={{ scaleX }} />;
}

/* Slow, endless text strip */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5">{item}</span>
          <span className="size-1 rounded-full bg-clay" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <span className="sr-only">{items.join(", ")}</span>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}

/* Image that drifts slightly slower than the page, and unveils from the bottom */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  priority,
  strength = 8,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-sand ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/* Progress bar for a horizontal swipe row */
export function SwipeProgress({
  container,
  className,
}: {
  container: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const { scrollXProgress } = useScroll({ container });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0.18, 1]);
  return (
    <div className={`h-px w-full bg-sand ${className ?? ""}`} aria-hidden="true">
      <motion.div className="h-px origin-left bg-forest" style={{ scaleX }} />
    </div>
  );
}

/* Stagger helpers for lists */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* Prev / next buttons for a horizontal row on pointer devices */
export function RailArrows({
  container,
  className,
}: {
  container: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const go = (dir: number) => {
    const el = container.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };
  const btn = `grid size-11 place-items-center rounded-full border transition-colors duration-300 ${className ?? ""}`;
  return (
    <div className="hidden gap-2 md:flex">
      <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={() => go(-1)} className={btn} aria-label="Scroll back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 rotate-180" aria-hidden="true">
          <path d="M4 12h15m-5-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
      <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={() => go(1)} className={btn} aria-label="Scroll forward">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
          <path d="M4 12h15m-5-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}
