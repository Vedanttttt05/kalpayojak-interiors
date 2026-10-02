"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { contact, heroImageWide, heroVideo, services, whatsappLink } from "@/content/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import { LineReveal, Marquee, ease } from "./motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto flex min-h-[64svh] max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:min-h-[72svh] md:px-8 md:pb-14">
        <motion.p className="eyebrow flex items-center gap-3" {...fade(0.1)}>
          <motion.span
            className="h-px w-8 origin-left bg-clay"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          />
          Interiors by {contact.name}
        </motion.p>

        <LineReveal
          as="h1"
          immediate
          delay={0.25}
          className="mt-5 font-display text-[2.35rem] font-light leading-[1.04] tracking-[-0.01em] text-forest sm:text-6xl md:text-[5.5rem]"
          lines={[
            "Spaces imagined,",
            <>
              <em className="font-normal text-clay-deep">thoughtfully</em> made.
            </>,
          ]}
        />

        <div className="mt-6 md:mt-10 md:flex md:items-end md:justify-between md:gap-10">
          <motion.p className="max-w-[19rem] text-[0.95rem] leading-relaxed text-stone md:max-w-sm" {...fade(0.6)}>
            Warm, practical homes with natural textures and soft light — from our studio in {contact.area}.
          </motion.p>

          <motion.div className="mt-7 flex items-center gap-5 md:mt-0" {...fade(0.75)}>
            <motion.a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-forest pl-5 pr-6 text-sm text-cream"
            >
              <WhatsAppIcon className="size-4" />
              Let&apos;s talk
            </motion.a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-forest"
            >
              Our work
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="border-y border-sand py-3.5 font-display text-lg italic text-stone"
      >
        <Marquee items={services} />
      </motion.div>

      <ExpandingImage />
    </section>
  );
}

/* Starts as an inset arch, opens to full-bleed as you scroll */
function ExpandingImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [240, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px ${radius}px 0px 0px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <div ref={ref} className="pt-8 md:pt-14">
      <motion.div className="relative h-[82svh] overflow-hidden bg-sand md:h-[92vh]" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <video
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={heroVideo.label}
            className="absolute inset-0 size-full object-cover md:hidden"
          />
          <Image
            src={heroImageWide}
            alt="Living room with cane sofa, walnut table and soft cove lighting"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 100vw, 1px"
            className="hidden object-cover md:block"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-5 pt-24 md:px-8">
          <div className="mx-auto flex max-w-6xl items-end justify-between text-cream">
            <p className="font-display text-2xl italic">
              <span className="md:hidden">{heroVideo.label}</span>
              <span className="hidden md:inline">The Sage Residence</span>
            </p>
            <p className="text-xs tracking-[0.18em] opacity-80">
              <span className="md:hidden">ON SITE</span>
              <span className="hidden md:inline">01 · LIVING</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
