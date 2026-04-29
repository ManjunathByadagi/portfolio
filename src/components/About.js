import React from 'react';
import { useInView } from '../hooks';

const BARS = [
  { label:'Deep Learning',      pct:92, color:'#8b7fff' },
  { label:'Python / PyTorch',   pct:94, color:'#00e8ff' },
  { label:'Data Engineering',   pct:82, color:'#3dffa0' },
  { label:'MLOps / Cloud',      pct:76, color:'#ffd166' },
  { label:'NLP & Transformers', pct:80, color:'#ff6b82' },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section style={{ padding:'7rem 2rem', maxWidth:980, margin:'0 auto' }} ref={ref}>
      {/* Section label */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'3.5rem' }}>
        <div style={{ fontSize:'0.68rem', color:'var(--v)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', whiteSpace:'nowrap' }}>◉ About Me</div>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg, rgba(139,127,255,0.4), transparent)', transformOrigin:'left', transform: inView ? 'scaleX(1)' : 'scaleX(0)', transition:'transform 1s var(--ease)' }} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)', transition:'all .8s var(--ease)' }}>
          <h2 style={{ fontFamily:'var(--font-h)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, lineHeight:1.05, letterSpacing:'-0.04em', marginBottom:'1.5rem' }}>
            Turning raw data<br /><span style={{ background:'linear-gradient(135deg,#8b7fff,#00e8ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>into real impact.</span>
          </h2>
          <p style={{ color:'var(--sub)', lineHeight:1.85, fontSize:'0.87rem', marginBottom:'1.5rem' }}>
            I'm a Computer Science student with a deep focus on Machine Learning and Data Science. I build AI systems that solve tangible problems — from diagnosing lung disease in X-rays to predicting crop failure before it happens.
          </p>
          <p style={{ color:'var(--sub)', lineHeight:1.85, fontSize:'0.87rem', marginBottom:'2rem' }}>
            My approach is research-driven and product-minded: I care about accuracy metrics, but even more about whether the model actually works in the real world, at scale.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {['Research','Production ML','Real-World Impact'].map(tag => (
              <span key={tag} style={{
                fontSize:'0.7rem', fontFamily:'var(--font-m)', color:'var(--v)',
                border:'1px solid rgba(139,127,255,0.25)', background:'rgba(139,127,255,0.08)',
                padding:'0.35rem 0.75rem', borderRadius:6
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — animated bars */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition:'all .8s .2s var(--ease)' }}>
          {BARS.map(({ label, pct, color }, i) => (
            <div key={label} style={{ opacity: inView ? 1 : 0, transition:`opacity .5s ${.3 + i * .1}s` }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                <span style={{ fontSize:'0.78rem', color:'var(--text)', fontFamily:'var(--font-m)' }}>{label}</span>
                <span style={{ fontSize:'0.78rem', color, fontFamily:'var(--font-m)' }}>{pct}%</span>
              </div>
              <div style={{ height:5, background:'rgba(255,255,255,0.06)', borderRadius:3, overflow:'hidden' }}>
                <div style={{
                  height:'100%', borderRadius:3,
                  background:`linear-gradient(90deg, ${color}, ${color}88)`,
                  width: inView ? `${pct}%` : '0%',
                  transition:`width 1.2s ${.4 + i * .1}s var(--ease)`,
                  boxShadow:`0 0 12px ${color}55`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
