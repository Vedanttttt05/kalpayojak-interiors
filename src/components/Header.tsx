"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import logo from "@/assets/logo.png";
import { contact, nav, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";
import { ScrollProgress } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Tuck the header away while reading down, bring it back on any scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (Math.abs(y - prev) < 6) return;
    setHidden(y > prev && y > 400);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-cream/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-5 transition-[border-color] duration-500 md:px-8 border-b ${
            scrolled && !open ? "border-sand" : "border-transparent"
          }`}
        >
          <a href="#top" aria-label="Kalpayojak — home" onClick={() => setOpen(false)} className="relative">
            <Image
              src={logo}
              alt="Kalpayojak"
              priority
              className="h-9 w-auto mix-blend-multiply md:h-10"
              sizes="120px"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-stone transition-colors hover:text-forest">
                {item.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm text-cream transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="size-4" />
              Let&apos;s talk
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative -mr-2 flex h-11 items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.2em] text-forest md:hidden"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-2.5 w-5">
              <motion.span
                className="absolute left-0 top-0 h-px w-5 bg-current"
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-px w-5 bg-current"
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease }}
              />
            </span>
          </button>
        </div>
        {scrolled && !open && <ScrollProgress className="absolute inset-x-0 bottom-0 h-px bg-forest/60" />}
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-cream px-5 pt-24 pb-safe md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-sand py-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i + 0.1, ease }}
                >
                  <span className="font-display text-4xl font-light text-forest">{item.label}</span>
                  <span className="text-xs text-stone">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-auto space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="eyebrow">Talk to {contact.name}</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-forest text-cream"
              >
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </a>
              <a href={`tel:+${contact.phoneE164}`} className="block text-center text-sm text-stone">
                or call {contact.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
