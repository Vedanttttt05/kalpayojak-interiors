"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { Photo } from "@/content/site";
import { ArrowIcon, CloseIcon } from "./icons";
import { ease } from "./motion";

/* Full-screen photo viewer: swipe, arrow keys, Esc */
export function Lightbox({
  images,
  title,
  index,
  onChange,
  onClose,
}: {
  images: Photo[];
  title: string;
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const total = images.length;
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

  const img = images[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
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
        <p className="truncate text-sm text-cream/80">{title}</p>
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
