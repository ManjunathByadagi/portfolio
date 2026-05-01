import React, { useEffect, useRef, useState } from 'react';

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
  const canvasRef = useRef(null);
  const title = useTypewriter(TITLES);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
    }));

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,127,255,0.5)';
        ctx.fill();
      });
      // Lines between close points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,127,255,${.18 * (1 - d / 120)})`;
            ctx.lineWidth = .5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="about" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Animated orbs */}
      <div style={{ position:'absolute', top:'15%', left:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,127,255,0.15) 0%, transparent 70%)', animation:'orb1 12s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'10%', right:'8%',  width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,232,255,0.10) 0%, transparent 70%)',   animation:'orb2 15s ease-in-out infinite', pointerEvents:'none' }} />

      {/* Grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(139,127,255,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(139,127,255,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', animation:'gridFlow 8s linear infinite', pointerEvents:'none' }} />

      <div style={{ position:'relative', textAlign:'center', maxWidth:900, padding:'0 2rem', animation:'fadeUp .8s var(--ease) both' }}>
        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem',
          marginBottom:'2rem', padding:'0.4rem 1.2rem', borderRadius:40,
          border:'1px solid rgba(139,127,255,0.3)',
          background:'rgba(139,127,255,0.08)',
          backdropFilter:'blur(10px)',
          fontSize:'0.7rem', fontFamily:'var(--font-m)', color:'var(--v)',
          letterSpacing:'0.1em', textTransform:'uppercase',
          animation:'fadeIn .6s .2s both'
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--g)', boxShadow:'0 0 8px var(--g)', animation:'pulse 2s infinite' }} />
          Open to Internships · Available Now
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily:'var(--font-h)', fontWeight:800,
          fontSize:'clamp(3rem, 8vw, 6.5rem)', lineHeight:.95,
          letterSpacing:'-0.05em', marginBottom:'1.5rem',
          background:'linear-gradient(135deg, #eeeef8 0%, #8b7fff 45%, #00e8ff 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          animation:'fadeUp .7s .1s var(--ease) both'
        }}>
          manjunath<br />Byadagi
        </h1>

        {/* Typewriter role */}
        <div style={{ fontSize:'clamp(1rem, 2.5vw, 1.3rem)', fontFamily:'var(--font-m)', marginBottom:'1.2rem', height:'2rem', animation:'fadeUp .7s .3s var(--ease) both' }}>
          <span style={{ color:'var(--sub)' }}>$ whoami → </span>
          <span style={{ color:'var(--c)', borderRight:'2px solid var(--v)', paddingRight:'2px', animation:'typeCursor .8s infinite' }}>{title}</span>
        </div>

        <p style={{ color:'var(--sub)', fontSize:'0.9rem', maxWidth:560, margin:'0 auto 3rem', lineHeight:1.7, animation:'fadeUp .7s .4s var(--ease) both' }}>
          Building scalable AI systems and intelligent pipelines for real-world impact.
          Specialized in multi-agent AI and production-ready ML solutions.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .7s .5s var(--ease) both' }}>
          {[
            { label:'◈ Chat with AI Me', href:'#chat', grad:'linear-gradient(135deg,#8b7fff,#00e8ff)', shadow:'rgba(139,127,255,0.45)' },
            { label:'View Projects →',   href:'#projects', grad:null, border:'rgba(255,255,255,0.12)' },
            { label:'↓ Resume',          href:'/resume.pdf', download:true, grad:null, border:'rgba(0,232,255,0.2)', color:'var(--c)' },
          ].map(btn => (
            <a key={btn.label} href={btn.href} download={btn.download || undefined} style={{
              padding:'0.9rem 2rem', borderRadius:10,
              background: btn.grad || 'rgba(255,255,255,0.04)',
              color: btn.color || '#fff',
              border: btn.border ? `1px solid ${btn.border}` : 'none',
              textDecoration:'none', fontSize:'0.82rem',
              fontFamily:'var(--font-m)', letterSpacing:'0.06em', textTransform:'uppercase',
              boxShadow: btn.shadow ? `0 0 30px ${btn.shadow}` : 'none',
              transition:'all .25s var(--ease)', display:'inline-block'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; if(btn.shadow) e.currentTarget.style.boxShadow=`0 0 50px ${btn.shadow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; if(btn.shadow) e.currentTarget.style.boxShadow=`0 0 30px ${btn.shadow}`; }}
            >{btn.label}</a>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:'3rem', justifyContent:'center', marginTop:'5rem', flexWrap:'wrap', animation:'fadeUp .7s .6s var(--ease) both' }}>
          {[['4+','ML Projects'],['95%','Peak Accuracy'],['3','Impact Domains'],['100K+','Users Served']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-h)', fontSize:'2.2rem', fontWeight:800, background:'linear-gradient(135deg,var(--v),var(--c))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{n}</div>
              <div style={{ fontSize:'0.65rem', color:'var(--dim)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:'0.2rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
