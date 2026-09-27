import Image from "next/image";
import logo from "@/assets/logo.png";
import { contact, mapsLink, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-sand bg-linen">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-12 pb-8 md:grid-cols-[1.2fr_1fr_auto] md:items-end md:px-8">
        <div>
          <Image src={logo} alt="Kalpayojak" className="h-12 w-auto mix-blend-multiply" sizes="140px" />
          <p className="mt-4 max-w-xs text-sm text-stone">Interior design for calm, intentional and lived-in homes.</p>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm leading-relaxed text-stone hover:text-forest"
        >
          {contact.address[0]}
          <br />
          {contact.address[1]}
        </a>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-forest">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-28 text-xs text-stone md:px-8 md:pb-10">
        © {new Date().getFullYear()} Kalpayojak Interiors · {contact.name}
      </p>
    </footer>
  );
}
