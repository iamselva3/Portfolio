import { useState, useEffect, Suspense, lazy } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import Layout from './components/layout/Layout';
import Chatbot from './components/ui/Chatbot';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import CodingSplashScreen from './components/ui/CodingSplashScreen';

const GravityView = lazy(() => import('./components/interactive/GravityView'));

export default function App() {
  const [gravityActive, setGravityActive] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    const handleReplay = () => setShowSplash(true);
    window.addEventListener('replay-splash', handleReplay);
    return () => window.removeEventListener('replay-splash', handleReplay);
  }, []);

  useEffect(() => {
    let keyBuffer = '';
    const code = 'gravity';

    const handleKeyDown = (e) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > code.length) {
        keyBuffer = keyBuffer.slice(-code.length);
      }
      if (keyBuffer === code) {
        setGravityActive(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showSplash && (
        <CodingSplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <Layout>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </Layout>

      {gravityActive && (
        <Suspense fallback={null}>
          <GravityView onClose={() => setGravityActive(false)} />
        </Suspense>
      )}
      <Chatbot />
    </>
  );
}
