"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { featured } from "@/content/site";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";
import { LineReveal, RailArrows, SwipeProgress, ease, fadeUp, staggerParent } from "./motion";

/* One home told as a short story: a lead image, then a swipe through the rest */
export function Featured() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = featured.images;

  return (
    <section id="work" className="bg-linen py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">Featured project</p>
        </Reveal>
        <LineReveal
          className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] text-forest md:text-6xl"
          lines={[
            "The Sage",
            <em key="em" className="text-clay-deep">
              Residence
            </em>,
          ]}
        />

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-14">
          <motion.button
            type="button"
            onClick={() => setLightbox(0)}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-sand md:aspect-[5/4]"
            initial={{ clipPath: "inset(12% 8% 0% 8% round 200px 200px 0px 0px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2px 2px 2px 2px)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.3, ease }}
            aria-label={`Open photo 1 of ${featured.images.length}: ${lead.alt}`}
          >
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.03]"
            />
          </motion.button>

          <div>
            <Reveal>
              <p className="flex justify-between border-b border-sand pb-3 text-xs uppercase tracking-[0.16em] text-stone">
                <span>{featured.meta}</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-[1rem] leading-relaxed text-ink">{featured.intro}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <button
                type="button"
                onClick={() => setLightbox(0)}
                className="group mt-6 inline-flex items-center gap-6 border-b border-forest/30 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest"
              >
                View all {featured.images.length} photos
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        ref={railRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mt-14 md:gap-4 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))] md:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {rest.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            variants={fadeUp}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLightbox(i + 1)}
            className="group relative aspect-[4/5] w-[64vw] max-w-[17rem] shrink-0 snap-start overflow-hidden rounded-sm bg-sand md:w-[16rem]"
            aria-label={`Open photo ${i + 2} of ${featured.images.length}: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 256px, 64vw"
              className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
            />
          </motion.button>
        ))}
      </motion.div>

      <div className="mx-auto mt-5 flex max-w-6xl items-center gap-4 px-5 md:px-8">
        <SwipeProgress container={railRef} className="flex-1" />
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone md:hidden">Swipe</span>
        <RailArrows container={railRef} className="border-forest/25 text-forest hover:bg-forest hover:text-cream" />
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={featured.images}
            title={featured.name}
            index={lightbox}
            onChange={setLightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
