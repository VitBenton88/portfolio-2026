import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <section id="about" style={{ minHeight: '50vh' }} />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
