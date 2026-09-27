import type { StaticImageData } from "next/image";

import sage01 from "@/assets/sage/01.jpg";
import sage02 from "@/assets/sage/02.jpg";
import sage03 from "@/assets/sage/03.jpg";
import sage04 from "@/assets/sage/04.jpg";
import sage05 from "@/assets/sage/05.jpg";
import sage06 from "@/assets/sage/06.jpg";
import sage07 from "@/assets/sage/07.jpg";
import sage08 from "@/assets/sage/08.jpg";
import sage09 from "@/assets/sage/09.jpg";
import sage10 from "@/assets/sage/10.jpg";
import sage11 from "@/assets/sage/11.jpg";
import sage12 from "@/assets/sage/12.jpg";
import sage13 from "@/assets/sage/13.jpg";

import walnut01 from "@/assets/walnut/01.jpg";
import walnut02 from "@/assets/walnut/02.jpg";
import walnut03 from "@/assets/walnut/03.jpg";
import walnut04 from "@/assets/walnut/04.jpg";
import walnut05 from "@/assets/walnut/05.jpg";
import walnut06 from "@/assets/walnut/06.jpg";
import walnut07 from "@/assets/walnut/07.jpg";
import walnut08 from "@/assets/walnut/08.jpg";
import walnut09 from "@/assets/walnut/09.jpg";
import walnut10 from "@/assets/walnut/10.jpg";
import walnut11 from "@/assets/walnut/11.jpg";
import walnut12 from "@/assets/walnut/12.jpg";
import walnut13 from "@/assets/walnut/13.jpg";
import walnut14 from "@/assets/walnut/14.jpg";
import walnut15 from "@/assets/walnut/15.jpg";
import walnut16 from "@/assets/walnut/16.jpg";

export const contact = {
  name: "Pooja Patil",
  role: "Founder & Principal Designer",
  phoneDisplay: "+91 76780 35038",
  phoneE164: "917678035038",
  email: "kalpayojakinteriors2728@gmail.com",
  // TODO: confirm Instagram handle
  instagram: "kalpayojak.interiors",
  area: "Dombivli",
  address: ["2nd Floor, Samarth Bldg, Sonarpada,", "Kalyan–Shilphata Rd, Dombivli (E)"],
};

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Samarth Building, Sonarpada, Kalyan-Shilphata Road, Dombivli East",
)}`;

export function whatsappLink(message = "Hi Pooja, I found Kalpayojak online and would like to discuss my space.") {
  return `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "#about", label: "Studio" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

// TODO: placeholder copy — replace with the studio's own words
export const about = {
  eyebrow: "The studio",
  title: ["Homes shaped", "around the way", "you live"],
  body: [
    "Kalpayojak — from kalpana (imagination) and yojak (one who plans) — is an interior design studio led by Pooja Patil.",
    "We design warm, practical homes: natural textures, soft light and joinery built to last. Every project begins with listening, and ends with a space that feels unmistakably yours.",
  ],
  // TODO: confirm real numbers
  stats: [
    { value: 50, suffix: "+", label: "Homes designed" },
    { value: 8, suffix: "", label: "Years of practice" },
    { value: 100, suffix: "%", label: "In-house execution" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  meta: string;
  images: { src: StaticImageData; alt: string }[];
};

// TODO: rename projects and write real alt text/locations
export const projects: Project[] = [
  {
    slug: "sage",
    name: "The Sage Residence",
    meta: "2 BHK · Living, dining & bedrooms",
    images: [
      { src: sage02, alt: "Living room with cane sofa, walnut table and TV wall" },
      { src: sage01, alt: "Living room overlooking the city" },
      { src: sage03, alt: "Interior detail" },
      { src: sage13, alt: "Living room with sculptural pendant light" },
      { src: sage04, alt: "Interior detail" },
      { src: sage05, alt: "Interior detail" },
      { src: sage06, alt: "TV unit with floating shelves and cove lighting" },
      { src: sage07, alt: "Interior detail" },
      { src: sage08, alt: "Interior detail" },
      { src: sage11, alt: "Study with daybed and sage cushions" },
      { src: sage09, alt: "Interior detail" },
      { src: sage10, alt: "Interior detail" },
      { src: sage12, alt: "Interior detail" },
    ],
  },
  {
    slug: "walnut",
    name: "Walnut & Brass",
    meta: "3 BHK · Full home interiors",
    images: [
      { src: walnut02, alt: "Marble-finish TV wall with walnut console" },
      { src: walnut01, alt: "Interior detail" },
      { src: walnut03, alt: "Bedroom with fluted headboard" },
      { src: walnut04, alt: "Interior detail" },
      { src: walnut05, alt: "Interior detail" },
      { src: walnut06, alt: "Interior detail" },
      { src: walnut07, alt: "Interior detail" },
      { src: walnut08, alt: "Interior detail" },
      { src: walnut09, alt: "Interior detail" },
      { src: walnut10, alt: "Interior detail" },
      { src: walnut11, alt: "Interior detail" },
      { src: walnut12, alt: "Interior detail" },
      { src: walnut13, alt: "Interior detail" },
      { src: walnut14, alt: "Wardrobe with chevron wood panels and brass inlays" },
      { src: walnut15, alt: "Interior detail" },
      { src: walnut16, alt: "Interior detail" },
    ],
  },
];

export const heroImage = sage02;
export const heroImageWide = sage01;
export const aboutImage = sage06;

export const process = [
  {
    title: "Consultation",
    body: "A relaxed conversation at your home or on WhatsApp. We understand how you live, your budget and your timeline.",
  },
  {
    title: "Concept & design",
    body: "Layouts, moodboards and 3D views — refined together until every corner feels right.",
  },
  {
    title: "Craft & execution",
    body: "Our team builds, finishes and supervises on site, with regular updates so you're never guessing.",
  },
  {
    title: "Handover",
    body: "A deep clean, styling touches and a walkthrough. You simply move in.",
  },
];

// TODO: placeholder testimonials — replace with real client words
export const testimonials = [
  {
    quote:
      "Pooja understood exactly what we wanted, even before we could explain it. Our home feels calm every single day.",
    name: "Client name",
    place: "2 BHK, Thane",
  },
  {
    quote: "Thoughtful storage, beautiful lighting and a team that finished on time. We couldn't have asked for more.",
    name: "Client name",
    place: "3 BHK, Navi Mumbai",
  },
];

export const services = [
  "Living rooms",
  "Modular kitchens",
  "Wardrobes",
  "Bedrooms",
  "TV units",
  "Lighting",
  "Full homes",
];

export const quickMessages = [
  "I'd like to book a consultation",
  "I'm planning a full home interior",
  "I need help with a kitchen / wardrobe",
  "Can you share an estimate?",
];
