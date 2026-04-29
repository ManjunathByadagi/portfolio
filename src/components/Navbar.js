// Navbar component handles navigation links and scroll behavior
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about',    label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills',   label: 'Skills' },
    { id: 'chat',     label: 'Chat' },
    { id: 'contact',  label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0.9rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(6,6,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(139,127,255,0.12)' : 'none',
      transition: 'all 0.4s var(--ease)',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span style={{ background: 'linear-gradient(135deg,#8b7fff,#00e8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MB</span>
        <span style={{ color: 'var(--v)', animation: 'blink 2s infinite' }}>_</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`}
            onMouseEnter={() => setActive(l.id)}
            onMouseLeave={() => setActive('')}
            style={{
              position: 'relative', padding: '0.4rem 0.85rem', borderRadius: '8px',
              color: active === l.id ? '#fff' : 'var(--sub)',
              textDecoration: 'none', fontSize: '0.75rem',
              fontFamily: 'var(--font-m)', letterSpacing: '0.06em', textTransform: 'uppercase',
              background: active === l.id ? 'rgba(139,127,255,0.12)' : 'transparent',
              border: active === l.id ? '1px solid rgba(139,127,255,0.25)' : '1px solid transparent',
              transition: 'all 0.2s',
            }}>
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="#contact" style={{
        position: 'relative', padding: '0.5rem 1.3rem', borderRadius: '8px',
        background: 'linear-gradient(135deg, #8b7fff 0%, #00e8ff 100%)',
        color: '#fff', textDecoration: 'none', fontSize: '0.72rem',
        fontFamily: 'var(--font-m)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
        boxShadow: '0 0 20px rgba(139,127,255,0.35)',
        transition: 'box-shadow 0.3s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(139,127,255,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(139,127,255,0.35)'; e.currentTarget.style.transform = 'none'; }}
      >Hire Me →</a>
    </nav>
  );
}
