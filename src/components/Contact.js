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
    <section id="contact" style={{ padding: '7rem 2rem 5rem', maxWidth: 820, margin: '0 auto', textAlign: 'center' }} ref={ref}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent)', marginBottom: '6rem' }} />

      <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all .8s var(--ease)' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--v)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: 'var(--font-m)' }}>◉ Get In Touch</div>

        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(2.2rem,6vw,4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.2rem' }}>
          Let's build something
          <br />
          <span style={{ background: 'linear-gradient(135deg,#7C3AED,#00F5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>remarkable.</span>
        </h2>

        <p style={{ color: 'var(--sub)', fontSize: '0.87rem', fontFamily: 'var(--font-m)', maxWidth: 460, margin: '0 auto 3rem', lineHeight: 1.75 }}>
          Open to ML internships, research collaborations, and interesting data science projects. Let's talk.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          <a
            href="mailto:manjunathbyadagi11@gmail.com"
            style={{
              background: 'linear-gradient(135deg,var(--v),var(--c))',
              color: '#fff', padding: '1rem 2.5rem', borderRadius: 10,
              textDecoration: 'none', fontSize: '0.82rem',
              fontFamily: 'var(--font-m)', letterSpacing: '0.08em', textTransform: 'uppercase',
              boxShadow: '0 0 40px rgba(124,58,237,0.35)', transition: 'all .25s var(--ease)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.35)'; }}
          >
            Send Email →
          </a>

          <button
            onClick={copyEmail}
            style={{
              background: copied ? 'rgba(34,255,136,0.1)' : 'rgba(255,255,255,0.04)',
              color: copied ? 'var(--g)' : 'var(--sub)',
              border: `1px solid ${copied ? 'rgba(34,255,136,0.35)' : 'rgba(255,255,255,0.1)'}`,
              padding: '1rem 2rem', borderRadius: 10, cursor: 'pointer',
              fontSize: '0.82rem', fontFamily: 'var(--font-m)',
              letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all .25s',
              boxShadow: copied ? '0 0 20px rgba(34,255,136,0.2)' : 'none',
            }}
          >
            {copied ? '✓ Copied!' : '⧉ Copy Email'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                padding: '1.2rem 1.8rem', borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none', transition: 'all .25s var(--ease)',
                opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
                transitionDelay: `${0.2 + i * 0.1}s`,
                minWidth: 160,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${l.color}40`; e.currentTarget.style.background = `${l.color}08`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${l.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
              <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{l.label}</span>
              <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.65rem', color: 'var(--dim)' }}>{l.sub.split('/')[0]}</span>
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '5rem', fontSize: '0.65rem', color: 'var(--dim)', fontFamily: 'var(--font-m)', opacity: inView ? 1 : 0, transition: 'opacity 1s 1s' }}>
        © 2025 Manjunath Byadagi · Built with React · Hosted on Vercel
      </div>
    </section>
  );
}
