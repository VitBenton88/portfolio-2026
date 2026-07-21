import { NavBar } from './components/NavBar';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <section id="hero" style={{ minHeight: '100vh' }} />
        <section id="about" style={{ minHeight: '50vh' }} />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
