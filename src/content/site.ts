import type { StaticImageData } from "next/image";

import sage01 from "@/assets/sage/01.jpg";
import sage02 from "@/assets/sage/02.jpg";
import sage03 from "@/assets/sage/03.jpg";
import sage04 from "@/assets/sage/04.jpg";
import sage06 from "@/assets/sage/06.jpg";
import sage08 from "@/assets/sage/08.jpg";
import sage10 from "@/assets/sage/10.jpg";
import sage11 from "@/assets/sage/11.jpg";
import sage12 from "@/assets/sage/12.jpg";
import sage13 from "@/assets/sage/13.jpg";

import living03 from "@/assets/portfolio/living/03.jpg";
import living04 from "@/assets/portfolio/living/04.jpg";
import living05 from "@/assets/portfolio/living/05.jpg";
import living06 from "@/assets/portfolio/living/06.jpg";
import living07 from "@/assets/portfolio/living/07.jpg";
import living08 from "@/assets/portfolio/living/08.jpg";
import living09 from "@/assets/portfolio/living/09.jpg";
import living10 from "@/assets/portfolio/living/10.jpg";
import living11 from "@/assets/portfolio/living/11.jpg";
import living12 from "@/assets/portfolio/living/12.jpg";
import kitchen01 from "@/assets/portfolio/kitchen/01.jpg";
import kitchen02 from "@/assets/portfolio/kitchen/02.jpg";
import kitchen03 from "@/assets/portfolio/kitchen/03.jpg";
import kitchen04 from "@/assets/portfolio/kitchen/04.jpg";
import kitchen05 from "@/assets/portfolio/kitchen/05.jpg";
import kitchen06 from "@/assets/portfolio/kitchen/06.jpg";
import kitchen07 from "@/assets/portfolio/kitchen/07.jpg";
import bedroom01 from "@/assets/portfolio/bedroom/01.jpg";
import bedroom02 from "@/assets/portfolio/bedroom/02.jpg";
import bedroom03 from "@/assets/portfolio/bedroom/03.jpg";
import bedroom04 from "@/assets/portfolio/bedroom/04.jpg";
import bedroom05 from "@/assets/portfolio/bedroom/05.jpg";
import bedroom06 from "@/assets/portfolio/bedroom/06.jpg";
import bedroom07 from "@/assets/portfolio/bedroom/07.jpg";
import bedroom08 from "@/assets/portfolio/bedroom/08.jpg";
import bedroom09 from "@/assets/portfolio/bedroom/09.jpg";
import wardrobe01 from "@/assets/portfolio/wardrobe/01.jpg";
import wardrobe02 from "@/assets/portfolio/wardrobe/02.jpg";
import wardrobe03 from "@/assets/portfolio/wardrobe/03.jpg";
import wardrobe04 from "@/assets/portfolio/wardrobe/04.jpg";
import wardrobe05 from "@/assets/portfolio/wardrobe/05.jpg";
import wardrobe06 from "@/assets/portfolio/wardrobe/06.jpg";
import wardrobe07 from "@/assets/portfolio/wardrobe/07.jpg";
import wardrobe08 from "@/assets/portfolio/wardrobe/08.jpg";
import wardrobe09 from "@/assets/portfolio/wardrobe/09.jpg";
import mandir01 from "@/assets/portfolio/mandir/01.jpg";
import mandir02 from "@/assets/portfolio/mandir/02.jpg";
import mandir03 from "@/assets/portfolio/mandir/03.jpg";
import mandir04 from "@/assets/portfolio/mandir/04.jpg";
import mandir05 from "@/assets/portfolio/mandir/05.jpg";
import mandir06 from "@/assets/portfolio/mandir/06.jpg";
import mandir07 from "@/assets/portfolio/mandir/07.jpg";
import mandir08 from "@/assets/portfolio/mandir/08.jpg";
import details01 from "@/assets/portfolio/details/01.jpg";
import details02 from "@/assets/portfolio/details/02.jpg";
import details03 from "@/assets/portfolio/details/03.jpg";
import details04 from "@/assets/portfolio/details/04.jpg";
import details05 from "@/assets/portfolio/details/05.jpg";
import details07 from "@/assets/portfolio/details/07.jpg";
import details08 from "@/assets/portfolio/details/08.jpg";

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
  { href: "#reels", label: "Reels" },
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

export type Photo = { src: StaticImageData; alt: string };

/* One home, shot end to end — the loose photos in media/PHOTOS */
// TODO: confirm project name, size and location
export const featured = {
  name: "The Sage Residence",
  meta: "2 BHK · Living, study & dining nook",
  intro:
    "A compact city-view apartment opened up with warm wood, cane, sage upholstery and layered cove lighting — every corner earns its keep.",
  images: [
    { src: sage03, alt: "Living room with a sculptural ring pendant" },
    { src: sage06, alt: "TV wall with floating shelves, wall light and cove lighting" },
    { src: sage08, alt: "Study corner with floating desk, shelves and roman blind" },
    { src: sage12, alt: "Dining nook with upholstered banquette and floating shelf" },
    { src: sage11, alt: "Sage daybed with patterned cushions beside the window" },
    { src: sage04, alt: "Daybed corner with a painted wardrobe and tall windows" },
    { src: sage13, alt: "Living room looking towards the TV wall and bedrooms" },
    { src: sage10, alt: "Walnut writing table and cane side table" },
    { src: sage02, alt: "Living room with cane daybed, walnut TV console and city view" },
  ] satisfies Photo[],
};

/* Photos from many sites (the PDF), grouped by space */
export type Space = { slug: string; label: string; blurb: string; images: Photo[] };

export const spaces: Space[] = [
  {
    slug: "living",
    label: "Living",
    blurb: "TV walls, lounges and lighting that make a room feel finished.",
    images: [
      { src: living03, alt: "Ivory sofa lounge with mirrored panel wall" },
      { src: living04, alt: "TV unit with backlit panels and a jaali pooja niche" },
      { src: living05, alt: "Marble-look TV wall with sculptural vases" },
      { src: living06, alt: "Grey TV wall with backlit niches" },
      { src: living07, alt: "Marble-panel TV wall with walnut console" },
      { src: living08, alt: "Sage leather sofas over a patterned rug" },
      { src: living09, alt: "Foyer with panelled wall and glass dining table" },
      { src: living10, alt: "Powder-blue sofa beneath a painted peacock motif" },
      { src: living11, alt: "Carved mandala wall above a study desk" },
      { src: living12, alt: "Fluted TV wall with a halo chandelier" },
    ],
  },
  {
    slug: "kitchen",
    label: "Kitchen & dining",
    blurb: "Hard-working modular kitchens and dining corners made for daily life.",
    images: [
      { src: kitchen01, alt: "Two-tone modular kitchen with brass trims" },
      { src: kitchen02, alt: "Galley kitchen in black and ivory" },
      { src: kitchen03, alt: "Kitchen with an ogee-pattern backsplash" },
      { src: kitchen04, alt: "Walnut kitchen with cane arched shutters" },
      { src: kitchen05, alt: "Green velvet dining set by the window" },
      { src: kitchen06, alt: "Kitchen with a built-in oven tower" },
      { src: kitchen07, alt: "Dining nook with quilted chairs and a bird motif" },
    ],
  },
  {
    slug: "bedroom",
    label: "Bedrooms",
    blurb: "Restful rooms with soft light, textured headboards and quiet storage.",
    images: [
      { src: bedroom01, alt: "Bedroom with a crescent-lit headboard" },
      { src: bedroom02, alt: "Warm bedroom with a backlit textured wall" },
      { src: bedroom03, alt: "Blush bedroom with a built-in wardrobe" },
      { src: bedroom04, alt: "Curved headboard glowing with cove light" },
      { src: bedroom05, alt: "Guest room with block-print headboard and art wall" },
      { src: bedroom06, alt: "Lilac bedroom with herringbone floor" },
      { src: bedroom07, alt: "Kids' room with a bunk bed and mural" },
      { src: bedroom08, alt: "Bedroom with a tall grey sliding wardrobe" },
      { src: bedroom09, alt: "Arched study niche with a reading bench" },
    ],
  },
  {
    slug: "wardrobe",
    label: "Wardrobes",
    blurb: "Full-height storage, detailed to look like furniture.",
    images: [
      { src: wardrobe01, alt: "Bottle-green sliding wardrobe with brass lines" },
      { src: wardrobe02, alt: "Grey wardrobe with chevron wood inlays" },
      { src: wardrobe03, alt: "Ivory wardrobe with sculpted handles" },
      { src: wardrobe04, alt: "Full-height sliding wardrobe with dresser" },
      { src: wardrobe05, alt: "Walnut wardrobe with cane-texture panels" },
      { src: wardrobe06, alt: "Two-tone wardrobe with round pulls" },
      { src: wardrobe07, alt: "Wardrobe with an integrated study desk" },
      { src: wardrobe08, alt: "Pull-out wicker storage baskets" },
      { src: wardrobe09, alt: "Compact storage unit with a lit desk" },
    ],
  },
  {
    slug: "mandir",
    label: "Mandir",
    blurb: "Pooja units designed with devotion — carved, lit and personal.",
    images: [
      { src: mandir01, alt: "Krishna mandir with a peacock arch" },
      { src: mandir02, alt: "Carved wooden mandir with an Om arch" },
      { src: mandir03, alt: "Arched mandir with a tree-of-life panel" },
      { src: mandir04, alt: "Mandir with a lotus mural backdrop" },
      { src: mandir05, alt: "Jaali mandir with a sunburst Om panel" },
      { src: mandir06, alt: "Mandir with carved pillars and a lit Om medallion" },
      { src: mandir07, alt: "White jaali mandir with an arched canopy" },
      { src: mandir08, alt: "Pooja corner with an engraved shloka panel" },
    ],
  },
  {
    slug: "details",
    label: "Art & details",
    blurb: "Murals, relief work and the small touches people remember.",
    images: [
      { src: details01, alt: "Hand-painted Pichwai wall mural" },
      { src: details02, alt: "Buddha bas-relief above a console" },
      { src: details03, alt: "Painted arches with peacocks" },
      { src: details04, alt: "Tropical mural beside an arched mirror" },
      { src: details05, alt: "Arched niches with a lit display" },
      { src: details07, alt: "Curved wall panelling with cove light" },
      { src: details08, alt: "Vanity desk with a fluted wood panel" },
    ],
  },
];

/* Short walkthrough clips — public/reels/NN.mp4 with NN.jpg posters */
const reelList = [
  { id: "01", label: "Dining with oval mirrors" },
  { id: "03", label: "Foyer storage" },
  { id: "02", label: "Entrance partition" },
  { id: "04", label: "Fluted wardrobe wall" },
  { id: "05", label: "Sculpted wardrobe" },
  { id: "06", label: "Vanity & glass divider" },
  { id: "07", label: "Arched sliding wardrobe" },
  { id: "08", label: "Fluted-glass wardrobe" },
  { id: "09", label: "Lit TV wall" },
  { id: "10", label: "Display shelving" },
  { id: "11", label: "Floating TV unit" },
].map((r) => ({ ...r, src: `/reels/${r.id}.mp4`, poster: `/reels/${r.id}.jpg` }));

/* The first clip opens the page on mobile; the rest live in the reels rail */
export const [heroReel, ...reels] = reelList;

export const heroImageWide = sage01;
export const aboutImage = living08;

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
  "Mandir units",
  "TV units",
  "Wall murals",
  "Lighting",
  "Full homes",
];

export const quickMessages = [
  "I'd like to book a consultation",
  "I'm planning a full home interior",
  "I need help with a kitchen / wardrobe",
  "Can you share an estimate?",
];
