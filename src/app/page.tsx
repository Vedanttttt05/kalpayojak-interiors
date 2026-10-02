import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Featured } from "@/components/Featured";
import { Process } from "@/components/Process";
import { Reels } from "@/components/Reels";
import { Spaces } from "@/components/Spaces";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Featured />
        <Spaces />
        <Reels />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionProvider>
  );
}
