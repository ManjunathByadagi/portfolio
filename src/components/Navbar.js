import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'chat', label: 'Chat' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0.9rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,7,10,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,58,237,0.12)' : 'none',
      transition: 'all 0.4s var(--ease)',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
    }}>
      <div
        style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ background: 'linear-gradient(135deg,#7C3AED,#00F5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.Manjunath</span>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {links.map(l => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onMouseEnter={() => setActive(l.id)}
            onMouseLeave={() => setActive('')}
            style={{
              position: 'relative', padding: '0.4rem 0.85rem', borderRadius: '8px',
              color: active === l.id ? '#fff' : 'var(--sub)',
              textDecoration: 'none', fontSize: '0.75rem',
              fontFamily: 'var(--font-m)', letterSpacing: '0.06em', textTransform: 'uppercase',
              background: active === l.id ? 'rgba(124,58,237,0.12)' : 'transparent',
              border: active === l.id ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
              transition: 'all 0.2s',
              textShadow: active === l.id ? '0 0 14px rgba(0,245,255,0.25)' : 'none',
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="liquid-magnetic"
        data-liquid-magnetic
        style={{
          position: 'relative', padding: '0.5rem 1.3rem', borderRadius: '8px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #00F5FF 100%)',
          color: '#fff', textDecoration: 'none', fontSize: '0.72rem',
          fontFamily: 'var(--font-m)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
          boxShadow: '0 0 20px rgba(124,58,237,0.35)',
        }}
      >
        Hire Me
      </a>
    </nav>
  );
}
