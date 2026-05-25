import React from 'react';
import { useInView } from '../hooks';

const TIMELINE = [
  { year: '2022-23', title: 'Foundations', text: 'Built core CS, Python, and data skills while exploring ML fundamentals.' },
  { year: '2024', title: 'Applied projects', text: 'Worked on phishing detection, customer segmentation, and multi-agent AI workflows.' },
  { year: '2025', title: 'Internship focus', text: 'Refined the portfolio around proof, clarity, and recruiter-friendly presentation.' },
];

const PROOF = [
  'GitHub active',
  'Resume available',
  'LinkedIn connected',
  'Open to internships',
];

export default function TrustProof() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ padding:'0 2rem 6rem', maxWidth:980, margin:'0 auto' }}>
      <div style={{
        borderRadius:24,
        border:'1px solid rgba(255,255,255,0.08)',
        background:'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        backdropFilter:'blur(14px)',
        padding:'1.4rem'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.4rem' }}>
          <div style={{ fontSize:'0.68rem', color:'#fff', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', whiteSpace:'nowrap' }}>◉ Proof & Journey</div>
          <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(124,58,237,0.35),transparent)' }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'0.9rem', marginBottom:'1rem' }}>
          {TIMELINE.map((item, index) => (
            <article key={item.year} style={{
              borderRadius:16,
              border:'1px solid rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.03)',
              padding:'1rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition:`all .5s ${index * .08}s var(--ease)`
            }}>
              <div style={{ fontSize:'0.68rem', color:'var(--c)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', marginBottom:'0.35rem' }}>{item.year}</div>
              <div style={{ fontFamily:'var(--font-h)', fontWeight:700, fontSize:'1rem', marginBottom:'0.45rem' }}>{item.title}</div>
              <div style={{ fontSize:'0.84rem', color:'var(--sub)', lineHeight:1.6 }}>{item.text}</div>
            </article>
          ))}
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
          {PROOF.map(item => (
            <span key={item} style={{
              fontSize:'0.7rem',
              fontFamily:'var(--font-m)',
              color:'#fff',
              border:'1px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.03)',
              padding:'0.35rem 0.75rem',
              borderRadius:999
            }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}