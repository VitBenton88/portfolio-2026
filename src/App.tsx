import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Resume />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
