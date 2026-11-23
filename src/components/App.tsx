import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Contact, { Footer } from "./sections/Contact";
import RevealObserver from "./ui/RevealObserver";
import { SmoothScroll } from "@/lib/scroll";

export default function App() {
  return (
    <SmoothScroll>
      <a className="skip" href="#main">Hoppa till innehållet</a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </SmoothScroll>
  );
}
