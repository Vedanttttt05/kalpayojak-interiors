"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide while the contact section is on screen — it already has WhatsApp buttons
    const contact = document.getElementById("contact");
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    if (contact) observer.observe(contact);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !contactVisible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Pooja on WhatsApp"
          className="fixed right-4 z-30 flex h-14 items-center gap-2 rounded-full bg-forest pl-4 pr-5 text-sm text-cream shadow-[0_12px_30px_-10px_rgba(11,59,52,0.55)] md:right-8"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.96 }}
        >
          <WhatsAppIcon className="size-5" />
          Chat
        </motion.a>
      )}
    </AnimatePresence>
  );
}
