"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { spaces } from "@/content/site";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { LineReveal, ease } from "./motion";

const MOBILE_COUNT = 6;

/* Work from many homes, browsed by room */
export function Spaces() {
  const [active, setActive] = useState(spaces[0].slug);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const space = spaces.find((s) => s.slug === active)!;
  const hiddenOnMobile = space.images.length - MOBILE_COUNT;

  const select = (slug: string, el: HTMLButtonElement) => {
    setActive(slug);
    setExpanded(false);
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="spaces" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">Across our homes</p>
        </Reveal>
        <LineReveal
          className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] text-forest md:text-6xl"
          lines={[
            "Every room,",
            <em key="em" className="text-clay-deep">
              considered
            </em>,
          ]}
        />
      </div>

      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Rooms"
          className="no-scrollbar mx-auto mt-8 flex max-w-6xl gap-1 overflow-x-auto px-5 md:mt-10 md:px-8"
        >
          {spaces.map((s) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={s.slug === active}
              onClick={(e) => select(s.slug, e.currentTarget)}
              className={`relative h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-300 ${
                s.slug === active ? "text-cream" : "text-stone hover:text-forest"
              }`}
            >
              {s.slug === active && (
                <motion.span
                  layoutId="space-pill"
                  className="absolute inset-0 rounded-full bg-forest"
                  transition={{ duration: 0.5, ease }}
                />
              )}
              {s.slug !== active && <span className="absolute inset-0 rounded-full border border-sand" />}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={space.slug + "-blurb"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex items-baseline justify-between gap-6 border-b border-sand pb-4 text-sm text-stone"
          >
            <span className="max-w-md">{space.blurb}</span>
            <span className="shrink-0 font-display text-lg italic text-clay-deep">
              {String(space.images.length).padStart(2, "0")}
            </span>
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={space.slug}
            className="mt-6 columns-2 gap-2.5 md:columns-3 md:gap-4 lg:columns-4"
            initial="hidden"
            whileInView="show"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {space.images.map((img, i) => (
              <motion.li
                key={i}
                className={`mb-2.5 break-inside-avoid md:mb-4 ${i >= MOBILE_COUNT && !expanded ? "hidden md:block" : ""}`}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.98 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
                }}
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-sm bg-sand"
                  aria-label={`Open photo ${i + 1} of ${space.images.length}: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="h-auto w-full transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10" />
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {hiddenOnMobile > 0 && (
          <div className="mt-6 flex justify-center md:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setExpanded((v) => !v)}
              className="h-12 rounded-full border border-forest/25 px-7 text-sm text-forest"
            >
              {expanded ? "Show fewer" : `Show ${hiddenOnMobile} more`}
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={space.images}
            title={space.label}
            index={lightbox}
            onChange={setLightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
