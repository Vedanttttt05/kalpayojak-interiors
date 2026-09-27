"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/content/site";
import { Reveal } from "./Reveal";
import { SwipeProgress, ease } from "./motion";

export function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden bg-sage-soft py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 id="testimonials-title" className="eyebrow">
            Kind words
          </h2>
        </Reveal>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mx-auto mt-8 flex max-w-6xl snap-x snap-mandatory scroll-px-5 gap-8 overflow-x-auto px-5 md:grid md:grid-cols-2 md:gap-16 md:overflow-visible md:px-8"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={i}
            className="w-[84vw] max-w-md shrink-0 snap-start md:w-auto md:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease }}
          >
            <motion.span
              className="block font-display text-6xl leading-none text-clay"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease }}
            >
              &ldquo;
            </motion.span>
            <blockquote className="-mt-4 font-display text-[1.5rem] font-light italic leading-snug text-forest md:text-3xl">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm text-stone">
              <span className="text-ink">{t.name}</span> · {t.place}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-8 px-5 md:hidden">
        <SwipeProgress container={railRef} className="bg-sage" />
      </div>
    </section>
  );
}
