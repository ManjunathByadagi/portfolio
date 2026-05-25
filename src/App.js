import React from 'react';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import TrustProof from './components/TrustProof';
import Projects from './components/Projects';
import Skills   from './components/Skills';
import ChatBot  from './components/ChatBot';
import Contact  from './components/Contact';
import NetworkBackground from './components/NetworkBackground';

export default function App() {
  return (
    <>
      <NetworkBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <TrustProof />
        <Projects />
        <Skills />
        <ChatBot />
        <Contact />
      </div>
    </>
  );
}
