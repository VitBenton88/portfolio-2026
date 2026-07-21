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
      <NavBar />
      <ChapterRail />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
