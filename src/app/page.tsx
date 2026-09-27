import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionProvider>
  );
}
