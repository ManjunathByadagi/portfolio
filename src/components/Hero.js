import React, { useEffect, useState } from 'react';

const TITLES = ['ML Engineer', 'Data Scientist', 'AI Builder', 'CS Student'];

function useTypewriter(words, speed = 80) {
  const [display, setDisplay] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    let timeout;
    if (!deleting && ci < word.length) {
      timeout = setTimeout(() => { setDisplay(word.slice(0, ci + 1)); setCi(ci + 1); }, speed);
    } else if (!deleting && ci === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && ci > 0) {
      timeout = setTimeout(() => { setDisplay(word.slice(0, ci - 1)); setCi(ci - 1); }, speed / 2);
    } else if (deleting && ci === 0) {
      setDeleting(false);
      setWi((wi + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [ci, deleting, wi, words, speed]);

  return display;
}

export default function Hero() {
  const title = useTypewriter(TITLES);

  return (
    <section id="about" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position:'relative', textAlign:'center', maxWidth:760, padding:'0 1.5rem', animation:'fadeUp .8s var(--ease) both' }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem',
          marginBottom:'1.4rem', padding:'0.36rem 1rem', borderRadius:40,
          border:'1px solid rgba(124,58,237,0.3)',
          background:'rgba(124,58,237,0.08)',
          backdropFilter:'blur(10px)',
          fontSize:'0.7rem', fontFamily:'var(--font-m)', color:'#fff',
          letterSpacing:'0.1em', textTransform:'uppercase',
          animation:'fadeIn .6s .2s both'
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--g)', boxShadow:'0 0 6px var(--g)', animation:'pulse 3s infinite' }} />
          Open to Internships - Available Now
        </div>

        <h1 style={{
          fontFamily:'var(--font-h)', fontWeight:800,
          fontSize:'clamp(2.6rem, 6.2vw, 5.2rem)', lineHeight:.94,
          letterSpacing:'-0.05em', marginBottom:'1rem',
          color:'#fff',
          animation:'fadeUp .7s .1s var(--ease) both',
          textShadow:'0 0 20px rgba(0,245,255,0.06)'
        }}>
          Manjunath<br />Byadagi
        </h1>

        <div style={{ fontSize:'clamp(0.95rem, 2vw, 1.15rem)', fontFamily:'var(--font-m)', marginBottom:'1rem', height:'1.8rem', animation:'fadeUp .7s .3s var(--ease) both' }}>
          <span style={{ color:'var(--dim)' }}>$ whoami - </span>
          <span style={{ color:'#fff', borderRight:'2px solid var(--v)', paddingRight:'2px', animation:'typeCursor .8s infinite' }}>{title}</span>
        </div>

        <p style={{ color:'var(--sub)', fontSize:'0.88rem', maxWidth:520, margin:'0 auto 2.2rem', lineHeight:1.8, animation:'fadeUp .7s .4s var(--ease) both' }}>
          B.Tech 4th year Computer Science student focused on machine learning, AI systems, and cybersecurity.
          I build practical projects that combine modeling, APIs, and clear implementation.
        </p>

        <div style={{ display:'flex', gap:'0.8rem', justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .7s .5s var(--ease) both' }}>
          {[
            { label:'View Projects', href:'#projects', grad:'linear-gradient(135deg,#7C3AED,#00F5FF)', shadow:'rgba(124,58,237,0.28)', color:'#fff' },
            { label:'Resume', href:'/manjunath_Byadagi.pdf', download:true, grad:null, border:'rgba(255,255,255,0.12)', color:'#fff' },
            { label:'Contact', href:'#contact', grad:null, border:'rgba(0,245,255,0.2)', color:'#fff' },
          ].map(btn => (
            <a key={btn.label} className="liquid-magnetic" data-liquid-magnetic href={btn.href} download={btn.download || undefined} style={{
              padding:'0.82rem 1.7rem', borderRadius:10,
              background: btn.grad || 'rgba(255,255,255,0.04)',
              color: btn.color || '#fff',
              border: btn.border ? `1px solid ${btn.border}` : 'none',
              textDecoration:'none', fontSize:'0.82rem',
              fontFamily:'var(--font-m)', letterSpacing:'0.06em', textTransform:'uppercase',
              boxShadow: btn.shadow ? `0 0 18px ${btn.shadow}` : 'none',
              display:'inline-block'
            }}>{btn.label}</a>
          ))}
        </div>

        <div style={{ display:'flex', gap:'2rem', justifyContent:'center', marginTop:'3.6rem', flexWrap:'nowrap', animation:'fadeUp .7s .6s var(--ease) both' }}>
          {[['4+','projects'],['AI/ML','focus'],['Cyber','security'],['Internship','ready']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-h)', fontSize:'clamp(1.15rem, 3vw, 1.8rem)', fontWeight:800, color:'#fff', whiteSpace:'nowrap' }}>{n}</div>
              <div style={{ fontSize:'0.62rem', color:'var(--sub)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:'0.18rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
