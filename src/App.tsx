import { NavBar } from './components/NavBar';
import { ChapterRail } from './components/ChapterRail';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { SECTION_IDS } from './types';

export function App() {
  // One scroll listener shared by both navs.
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar active={active} />
      <ChapterRail active={active} />
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
