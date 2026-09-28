import About from './components/About';
import AttackTypes from './components/AttackTypes';
import Compliance from './components/Compliance';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import TrustBar from './components/TrustBar';

export default function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <HowItWorks />
        <AttackTypes />
        <Compliance />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Contact />
    </>
  );
}
