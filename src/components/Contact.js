import React, { useState } from 'react';
import { useInView } from '../hooks';

const LINKS = [
  { label: 'Email', icon: '📧', href: 'mailto:manjunathbyadagi11@gmail.com', color: '#ff6b82', sub: 'manjunathbyadagi11@gmail.com' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/manjunath-k-byadagi/', color: '#00F5FF', sub: 'linkedin.com/in/manjunath-k-byadagi' },
  { label: 'GitHub', icon: '🐙', href: 'https://github.com/ManjunathByadagi', color: '#7C3AED', sub: 'github.com/ManjunathByadagi' },
];

export default function Contact() {
  const [ref, inView] = useInView();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText('manjunathbyadagi11@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" style={{ padding: '5.8rem 2rem 4.5rem', maxWidth: 920, margin: '0 auto' }} ref={ref}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)', marginBottom: '4.2rem' }} />

      <div style={{ display:'grid', gridTemplateColumns:'1.05fr 0.95fr', gap:'1.5rem', alignItems:'start', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all .8s var(--ease)' }}>
        <div>
          <div style={{ fontSize: '0.68rem', color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: 'var(--font-m)' }}>◉ Get In Touch</div>

          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(2rem,4.6vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: '1rem' }}>
            Let’s discuss
            <br />
            <span style={{ color: '#fff' }}>internship-ready AI work.</span>
          </h2>

          <p style={{ color: 'var(--sub)', fontSize: '0.9rem', fontFamily: 'var(--font-m)', maxWidth: 500, margin: '0 0 1.6rem', lineHeight: 1.8 }}>
            Open to internships, applied AI projects, and research opportunities where I can contribute with ML, AI systems, and cybersecurity work.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:'0.75rem', marginBottom:'1.4rem' }}>
            <a href="mailto:manjunathbyadagi11@gmail.com" style={{
              background: 'linear-gradient(135deg,var(--v),var(--c))',
              color: '#fff', padding: '0.95rem 1.1rem', borderRadius: 12,
              textDecoration: 'none', fontSize: '0.8rem',
              fontFamily: 'var(--font-m)', letterSpacing: '0.08em', textTransform: 'uppercase',
              boxShadow: '0 0 24px rgba(124,58,237,0.22)', textAlign:'center'
            }}>Email Me</a>
            <a href="/manjunath_Byadagi.pdf" download style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#fff', padding: '0.95rem 1.1rem', borderRadius: 12,
              textDecoration: 'none', fontSize: '0.8rem',
              fontFamily: 'var(--font-m)', letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.1)', textAlign:'center'
            }}>Download Resume</a>
          </div>

          <p style={{ color:'var(--dim)', fontSize:'0.72rem', fontFamily:'var(--font-m)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'0.9rem' }}>
            Fastest response via email or LinkedIn. I usually reply with a short intro and project links.
          </p>
        </div>

        <div>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                padding: '1rem 1.1rem', borderRadius: 16,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none', transition: 'all .25s var(--ease)',
                opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
                transitionDelay: `${0.2 + i * 0.08}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}40`; e.currentTarget.style.background = `${l.color}08`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${l.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: '1.25rem' }}>{l.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{l.label}</div>
                <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.68rem', color: 'var(--sub)', marginTop:'0.15rem' }}>{l.sub.split('/')[0]}</div>
              </div>
              <div style={{ fontSize:'0.64rem', color:'#fff', fontFamily:'var(--font-m)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                Open ↗
              </div>
            </a>
          ))}
          </div>

          <div style={{ display:'flex', gap:'0.7rem', marginTop:'0.85rem', flexWrap:'wrap' }}>
            <button
              onClick={copyEmail}
              style={{
                background: copied ? 'rgba(34,255,136,0.1)' : 'rgba(255,255,255,0.04)',
                color: copied ? 'var(--g)' : '#fff',
                border: `1px solid ${copied ? 'rgba(34,255,136,0.35)' : 'rgba(255,255,255,0.1)'}`,
                padding: '0.8rem 1rem', borderRadius: 12, cursor: 'pointer',
                fontSize: '0.78rem', fontFamily: 'var(--font-m)',
                letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all .25s',
              }}
            >
              {copied ? '✓ Copied email' : 'Copy email'}
            </button>
            <a href="#projects" style={{
              background:'rgba(255,255,255,0.04)',
              color:'#fff',
              border:'1px solid rgba(255,255,255,0.1)',
              padding:'0.8rem 1rem',
              borderRadius:12,
              textDecoration:'none',
              fontSize:'0.78rem',
              fontFamily:'var(--font-m)',
              letterSpacing:'0.08em',
              textTransform:'uppercase'
            }}>View projects</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2.2rem', fontSize: '0.65rem', color: 'var(--dim)', fontFamily: 'var(--font-m)', opacity: inView ? 1 : 0, transition: 'opacity 1s 1s', textAlign:'center' }}>
        © 2025 Manjunath Byadagi · Built with React · Hosted on Vercel
      </div>
    </section>
  );
}
