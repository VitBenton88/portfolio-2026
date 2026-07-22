import { NavBar } from './components/NavBar';
import { ChapterRail } from './components/ChapterRail';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <ChapterRail />
      <main id="main-content">
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
