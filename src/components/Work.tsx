"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { projects, type Project } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowIcon, CloseIcon } from "./icons";
import { LineReveal, SwipeProgress, ease, fadeUp, staggerParent } from "./motion";

const DESKTOP_COUNT = 9;

export function Work() {
  const [active, setActive] = useState(projects[0].slug);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.slug === active)!;
  const desktopVisible = expanded ? project.images : project.images.slice(0, DESKTOP_COUNT);

  const selectProject = (slug: string) => {
    setActive(slug);
    setExpanded(false);
    railRef.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="work" className="bg-linen py-20 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="md:flex md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Selected work</p>
            </Reveal>
            <LineReveal
              className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] text-forest md:text-6xl"
              lines={[
                "Homes we've",
                <em key="em" className="text-clay-deep">
                  brought to life
                </em>,
              ]}
            />
          </div>

          <Reveal delay={0.15}>
            <div
              role="tablist"
              aria-label="Projects"
              className="no-scrollbar -mx-5 mt-7 flex gap-1 overflow-x-auto px-5 md:mx-0 md:mt-0 md:px-0"
            >
              {projects.map((p) => (
                <button
                  key={p.slug}
                  role="tab"
                  aria-selected={p.slug === active}
                  onClick={() => selectProject(p.slug)}
                  className={`relative h-10 shrink-0 rounded-full px-5 text-sm transition-colors duration-300 ${
                    p.slug === active ? "text-cream" : "text-stone hover:text-forest"
                  }`}
                >
                  {p.slug === active && (
                    <motion.span
                      layoutId="project-pill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  <span className="relative">{p.name}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={project.slug + "-meta"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex justify-between border-b border-sand pb-4 text-xs text-stone md:mt-10"
          >
            <span>{project.meta}</span>
            <span>{project.images.length} photos</span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Mobile: swipe rail */}
      <div className="md:hidden">
        <div ref={railRef} className="no-scrollbar mt-6 snap-x snap-mandatory scroll-px-5 overflow-x-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              className="flex w-max gap-3 px-5"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, x: -24, transition: { duration: 0.3 } }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            >
              {project.images.map((img, i) => (
                <motion.button
                  key={i}
                  type="button"
                  variants={fadeUp}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLightbox(i)}
                  className="relative aspect-[4/5] w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-sm bg-sand"
                  aria-label={`Open photo ${i + 1} of ${project.images.length}: ${img.alt}`}
                >
                  <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="80vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-cream/85 px-2.5 py-1 text-[0.65rem] tracking-[0.15em] text-forest backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-5 flex items-center gap-4 px-5">
          <SwipeProgress container={railRef} className="flex-1" />
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">Swipe</span>
        </div>
      </div>

      {/* Desktop: masonry grid */}
      <div className="mx-auto hidden max-w-6xl px-8 md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            className="mt-10 columns-3 gap-5"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {desktopVisible.map((img, i) => (
              <motion.button
                key={i}
                type="button"
                variants={fadeUp}
                onClick={() => setLightbox(i)}
                className="group relative mb-5 block w-full overflow-hidden rounded-sm bg-sand"
                aria-label={`Open photo ${i + 1} of ${project.images.length}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  sizes="33vw"
                  className="h-auto w-full transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10" />
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {project.images.length > DESKTOP_COUNT && (
          <div className="mt-8 flex justify-center">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setExpanded((v) => !v)}
              className="h-12 rounded-full border border-forest/25 px-7 text-sm text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              {expanded ? "Show fewer" : `View all ${project.images.length} photos`}
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox project={project} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  project,
  index,
  onChange,
  onClose,
}: {
  project: Project;
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const total = project.images.length;
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const img = project.images[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#1f1c19]/95 text-cream backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-5 md:px-8">
        <p className="text-xs tracking-[0.2em] text-cream/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 grid size-11 place-items-center"
          aria-label="Close gallery"
        >
          <CloseIcon className="size-6" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            className="absolute inset-0 flex items-center justify-center px-3 md:px-20"
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <div className="relative h-full w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                draggable={false}
                className="pointer-events-none select-none object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          className="absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 md:grid"
          aria-label="Previous photo"
        >
          <ArrowIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          className="absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 md:grid"
          aria-label="Next photo"
        >
          <ArrowIcon className="size-5" />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 px-5 pt-4 pb-safe md:px-8">
        <p className="truncate text-sm text-cream/80">{project.name}</p>
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-11 place-items-center rounded-full bg-cream/10"
            aria-label="Previous photo"
          >
            <ArrowIcon className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-11 place-items-center rounded-full bg-cream/10"
            aria-label="Next photo"
          >
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
