import React from 'react';
import { useInView } from '../hooks';

const FOCUS = [
  { label:'Machine Learning', note:'Modeling, evaluation, and feature-driven solutions' },
  { label:'AI Systems', note:'Agent workflows, APIs, and practical orchestration' },
  { label:'Cybersecurity', note:'Phishing detection and security-minded problem solving' },
  { label:'Data Science', note:'Segmentation, analysis, and insight generation' },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section style={{ padding:'7rem 2rem', maxWidth:980, margin:'0 auto' }} ref={ref}>
      {/* Section label */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'3.5rem' }}>
        <div style={{ fontSize:'0.68rem', color:'#fff', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', whiteSpace:'nowrap' }}>◉ About Me</div>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg, rgba(124,58,237,0.4), transparent)', transformOrigin:'left', transform: inView ? 'scaleX(1)' : 'scaleX(0)', transition:'transform 1s var(--ease)' }} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)', transition:'all .8s var(--ease)' }}>
          <h2 style={{ fontFamily:'var(--font-h)', fontSize:'clamp(1.9rem,3.2vw,2.7rem)', fontWeight:800, lineHeight:1.08, letterSpacing:'-0.04em', marginBottom:'1.2rem' }}>
            B.Tech student building<br /><span style={{ color:'#fff' }}>practical ML and AI systems.</span>
          </h2>
          <p style={{ color:'var(--sub)', lineHeight:1.85, fontSize:'0.9rem', marginBottom:'1.2rem' }}>
            I’m a 4th year Computer Science student focused on machine learning, AI systems, and cybersecurity. I prefer projects that solve a clear problem and show how models, data, and APIs work together.
          </p>
          <p style={{ color:'var(--sub)', lineHeight:1.85, fontSize:'0.9rem', marginBottom:'1.6rem' }}>
            My work includes phishing detection, customer segmentation, and multi-agent AI workflows. I’m currently looking for internships where I can contribute to applied AI work and keep learning from production teams.
          </p>
          <div style={{ display:'flex', gap:'0.7rem', flexWrap:'wrap' }}>
            {['ML', 'AI Systems', 'Cybersecurity', 'Problem Solving'].map(tag => (
              <span key={tag} style={{
                fontSize:'0.7rem', fontFamily:'var(--font-m)', color:'#fff',
                border:'1px solid rgba(124,58,237,0.25)', background:'rgba(124,58,237,0.08)',
                padding:'0.35rem 0.75rem', borderRadius:6
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — focus cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:'0.9rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition:'all .8s .2s var(--ease)' }}>
          {FOCUS.map(({ label, note }, i) => (
            <div key={label} style={{
              borderRadius:14,
              border:'1px solid rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.03)',
              padding:'1rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(14px)',
              transition:`all .45s ${.2 + i * .08}s var(--ease)`
            }}>
              <div style={{ fontSize:'0.76rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', fontFamily:'var(--font-m)', marginBottom:'0.4rem' }}>{label}</div>
              <div style={{ fontSize:'0.82rem', color:'var(--sub)', lineHeight:1.55 }}>{note}</div>
            </div>
          ))}
          <div style={{
            gridColumn:'1 / -1',
            borderRadius:14,
            border:'1px solid rgba(0,245,255,0.16)',
            background:'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,245,255,0.06))',
            padding:'1rem 1.1rem'
          }}>
            <div style={{ fontSize:'0.68rem', color:'#fff', textTransform:'uppercase', letterSpacing:'0.12em', fontFamily:'var(--font-m)', marginBottom:'0.35rem' }}>Current direction</div>
            <div style={{ fontSize:'0.84rem', color:'var(--sub)', lineHeight:1.6 }}>
              Building internship-ready projects that are easy to explain, easy to trust, and useful in real-world AI workflows.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
