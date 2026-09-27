"use client";

import { motion } from "framer-motion";
import { about, aboutImage, contact } from "@/content/site";
import { Reveal } from "./Reveal";
import { CountUp, LineReveal, ParallaxImage, ease } from "./motion";

export function About() {
  return (
    <section id="about" className="py-20 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">{about.eyebrow}</p>
        </Reveal>
        <LineReveal
          className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] text-forest md:text-6xl"
          lines={[
            about.title[0],
            <em key="em" className="text-clay-deep">
              {about.title[1]}
            </em>,
            about.title[2],
          ]}
        />

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative">
            <ParallaxImage
              src={aboutImage}
              alt="TV unit with floating walnut shelves and warm cove lighting"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/3] rounded-sm"
            />
            <motion.div
              className="absolute -bottom-6 right-4 rounded-sm bg-sage-soft px-5 py-4 shadow-[0_10px_30px_-18px_rgba(11,59,52,0.4)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
            >
              <p className="font-display text-xl italic text-forest">{contact.name}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">{contact.role}</p>
            </motion.div>
          </div>

          <div className="pt-4 md:pt-0">
            <Reveal>
              <p className="text-[1.05rem] leading-relaxed text-ink md:text-lg">{about.body[0]}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-stone">{about.body[1]}</p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-3 gap-2 border-t border-sand pt-6">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[2.1rem] font-light leading-none text-forest md:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-2 text-[0.72rem] leading-snug text-stone md:text-xs">{stat.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
