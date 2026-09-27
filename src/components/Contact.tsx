"use client";

import { motion } from "framer-motion";
import { contact, mapsLink, quickMessages, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { LineReveal, ease, fadeUp, staggerParent } from "./motion";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <LineReveal
            className="mt-4 font-display text-[2.3rem] font-light leading-[1.04] text-forest md:text-6xl"
            lines={[
              "Let's shape",
              <em key="em" className="text-clay-deep">
                your space
              </em>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-stone">
              Tell us a little about your home — {contact.name.split(" ")[0]} replies personally, usually within a day.
            </p>
          </Reveal>

          <motion.ul
            className="mt-9 divide-y divide-sand border-y border-sand"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            <ContactRow href={`tel:+${contact.phoneE164}`} icon={<PhoneIcon className="size-[1.1rem]" />} label="Call">
              {contact.phoneDisplay}
            </ContactRow>
            <ContactRow href={`mailto:${contact.email}`} icon={<MailIcon className="size-[1.1rem]" />} label="Email">
              <span className="break-all">{contact.email}</span>
            </ContactRow>
            <ContactRow href={mapsLink} external icon={<PinIcon className="size-[1.1rem]" />} label="Visit the studio">
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </ContactRow>
          </motion.ul>
        </div>

        <Reveal delay={0.1} className="rounded-sm bg-linen p-6 md:p-10">
          <p className="font-display text-2xl leading-snug text-forest">What can we help with?</p>
          <p className="mt-2 text-sm text-stone">Tap a topic — WhatsApp opens with your message ready.</p>

          <motion.ul
            className="mt-6 divide-y divide-sand border-y border-sand"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {quickMessages.map((msg) => (
              <motion.li key={msg} variants={fadeUp}>
                <motion.a
                  href={whatsappLink(`Hi Pooja! ${msg}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ x: 4 }}
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 text-[0.95rem] text-ink transition-colors hover:text-forest"
                >
                  {msg}
                  <ArrowIcon className="size-4 shrink-0 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3, ease }}
            className="mt-8 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-forest text-cream"
          >
            <WhatsAppIcon className="size-5" />
            Chat on WhatsApp
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon,
  label,
  external,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.li variants={fadeUp}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start gap-4 py-4"
      >
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-sage-soft text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-stone">{label}</span>
          <span className="mt-1 block text-[0.95rem] leading-snug text-ink">{children}</span>
        </span>
        <ArrowIcon className="mt-3 size-4 shrink-0 -rotate-45 text-clay-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.li>
  );
}
