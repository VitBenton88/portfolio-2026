import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
