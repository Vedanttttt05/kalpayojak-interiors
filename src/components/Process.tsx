"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { process, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";
import { LineReveal, SwipeProgress, ease, fadeUp, staggerParent } from "./motion";

export function Process() {
  const railRef = useRef<HTMLOListElement>(null);

  return (
    <section id="process" className="py-20 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:flex md:items-end md:justify-between md:px-8">
        <div>
          <Reveal>
            <p className="eyebrow">How we work</p>
          </Reveal>
          <LineReveal
            className="mt-4 font-display text-[2.15rem] font-light leading-[1.05] text-forest md:text-6xl"
            lines={[
              <>
                A calm, <em className="text-clay-deep">considered</em>
              </>,
              "process",
            ]}
          />
        </div>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone md:mt-0">
            Four clear steps from the first chat to move-in day — with one point of contact throughout.
          </p>
        </Reveal>
      </div>

      <motion.ol
        ref={railRef}
        className="no-scrollbar mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mt-14 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-8"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {process.map((step, i) => (
          <motion.li
            key={step.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease }}
            className="flex w-[76vw] max-w-xs shrink-0 snap-start flex-col rounded-sm bg-[#fcfaf6] p-6 shadow-[0_1px_0_var(--color-sand)] md:w-auto md:max-w-none"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-light text-clay">0{i + 1}</span>
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-stone">Step</span>
            </div>
            <motion.div
              className="my-7 h-px w-full origin-left bg-sand"
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
            />
            <h3 className="font-display text-[1.6rem] leading-tight text-forest">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone">{step.body}</p>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-5 flex items-center gap-4 px-5 md:hidden">
        <SwipeProgress container={railRef} className="flex-1" />
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">Swipe</span>
      </div>

      <Reveal className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <a
          href={whatsappLink("Hi Pooja, I'd like to book a consultation for my home.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-6 border-b border-forest/30 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest"
        >
          Book a consultation
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </section>
  );
}
