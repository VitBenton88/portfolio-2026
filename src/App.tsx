import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
