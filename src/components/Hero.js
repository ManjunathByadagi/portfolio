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
    <section id="about" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position:'relative', textAlign:'center', maxWidth:900, padding:'0 2rem', animation:'fadeUp .8s var(--ease) both' }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem',
          marginBottom:'2rem', padding:'0.4rem 1.2rem', borderRadius:40,
          border:'1px solid rgba(124,58,237,0.3)',
          background:'rgba(124,58,237,0.08)',
          backdropFilter:'blur(10px)',
          fontSize:'0.7rem', fontFamily:'var(--font-m)', color:'#fff',
          letterSpacing:'0.1em', textTransform:'uppercase',
          animation:'fadeIn .6s .2s both'
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--g)', boxShadow:'0 0 8px var(--g)', animation:'pulse 2s infinite' }} />
          Open to Internships - Available Now
        </div>

        <h1 style={{
          fontFamily:'var(--font-h)', fontWeight:800,
          fontSize:'clamp(3rem, 8vw, 6.5rem)', lineHeight:.95,
          letterSpacing:'-0.05em', marginBottom:'1.5rem',
          color:'#fff',
          animation:'fadeUp .7s .1s var(--ease) both',
          textShadow:'0 0 34px rgba(0,245,255,0.08)'
        }}>
          Manjunath<br />Byadagi
        </h1>

        <div style={{ fontSize:'clamp(1rem, 2.5vw, 1.3rem)', fontFamily:'var(--font-m)', marginBottom:'1.2rem', height:'2rem', animation:'fadeUp .7s .3s var(--ease) both' }}>
          <span style={{ color:'var(--sub)' }}>$ whoami - </span>
          <span style={{ color:'#fff', borderRight:'2px solid var(--v)', paddingRight:'2px', animation:'typeCursor .8s infinite' }}>{title}</span>
        </div>

        <p style={{ color:'var(--sub)', fontSize:'0.9rem', maxWidth:560, margin:'0 auto 3rem', lineHeight:1.7, animation:'fadeUp .7s .4s var(--ease) both', textShadow:'0 0 20px rgba(230,241,255,0.035)' }}>
          Building scalable AI systems and intelligent pipelines for real-world impact.
          Specialized in multi-agent AI and production-ready ML solutions.
        </p>

        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .7s .5s var(--ease) both' }}>
          {[
            { label:'Chat with AI Me', href:'#chat', grad:'linear-gradient(135deg,#7C3AED,#00F5FF)', shadow:'rgba(124,58,237,0.45)' },
            { label:'View Projects', href:'#projects', grad:null, border:'rgba(255,255,255,0.12)' },
            { label:'Resume', href:'/manjunath_Byadagi.pdf', download:true, grad:null, border:'rgba(0,245,255,0.2)', color:'var(--c)' },
          ].map(btn => (
            <a key={btn.label} className="liquid-magnetic" data-liquid-magnetic href={btn.href} download={btn.download || undefined} style={{
              padding:'0.9rem 2rem', borderRadius:10,
              background: btn.grad || 'rgba(255,255,255,0.04)',
              color: btn.color || '#fff',
              border: btn.border ? `1px solid ${btn.border}` : 'none',
              textDecoration:'none', fontSize:'0.82rem',
              fontFamily:'var(--font-m)', letterSpacing:'0.06em', textTransform:'uppercase',
              boxShadow: btn.shadow ? `0 0 30px ${btn.shadow}` : 'none',
              display:'inline-block'
            }}>{btn.label}</a>
          ))}
        </div>

        <div style={{ display:'flex', gap:'3rem', justifyContent:'center', marginTop:'5rem', flexWrap:'nowrap', animation:'fadeUp .7s .6s var(--ease) both' }}>
          {[['4+','ML Projects'],['95%','Peak Accuracy'],['4','Domains'],['End-to-End','ML Systems']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-h)', fontSize:'clamp(1.4rem, 4vw, 2.2rem)', fontWeight:800, color:'#fff', whiteSpace:'nowrap' }}>{n}</div>
              <div style={{ fontSize:'0.65rem', color:'#fff', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:'0.2rem', textShadow:'0 0 12px rgba(255,255,255,0.15)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
