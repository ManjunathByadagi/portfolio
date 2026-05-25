import React, { useState } from 'react';
import { useInView } from '../hooks';

const PROJECTS = [
  {
    emoji: '🤖', tag: 'AI Systems', title: 'MultiAgent AI System',
    problem: 'Single-model outputs can be inconsistent when a task needs planning, research, and review.',
    solution: 'Built a LangGraph workflow with planner, researcher, writer, and critic roles for structured reasoning.',
    result: 'Clearer outputs, modular orchestration, and a system easier to explain in interviews.',
    metric: '4-agent workflow',
    stack: ['LangGraph', 'LLMs', 'Python', 'Prompt Engineering'],
    accent: '#7C3AED', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '🛡️', tag: 'Cybersecurity AI', title: 'PhishGuard AI',
    problem: 'Phishing messages change quickly and are hard to catch with rigid rule-based filters.',
    solution: 'Built a text-classification pipeline using TF-IDF, scikit-learn, and a FastAPI backend for predictions.',
    result: 'A practical phishing detector with a real-time API and clear deployment path.',
    metric: 'Real-time API',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'FastAPI'],
    accent: '#7C3AED', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '📊', tag: 'Data Science', title: 'Customer Segmentation',
    problem: 'Churn risk is easy to miss when customer behavior is spread across many signals.',
    solution: 'Used K-Means and PCA to group Telco users into interpretable retention segments.',
    result: 'Clearer customer groups for retention analysis and decision-making.',
    metric: 'Segmented groups',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'K-Means', 'PCA'],
    accent: '#22FF88', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '🗳️', tag: 'Blockchain', title: 'Voting System',
    problem: 'Traditional voting systems need stronger transparency, auditability, and privacy guarantees.',
    solution: 'Built a blockchain voting prototype using smart contracts with secure voter flow and verification logic.',
    result: 'A verifiable voting workflow designed for trust and tamper resistance.',
    metric: 'Audit-ready prototype',
    stack: ['Solidity', 'Ethereum', 'Smart Contracts', 'Hardhat'],
    accent: '#00F5FF', github: 'https://github.com/manjunath-shanmugari'
  },
];

function clampTilt(value) {
  return Math.max(-5, Math.min(5, value));
}

function PCard({ p, delay, inView }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [expanded, setExpanded] = useState(false);

  const activateNetwork = (event, active) => {
    const rect = event.currentTarget.getBoundingClientRect();

    window.dispatchEvent(new CustomEvent('project-card-activate', {
      detail: {
        active,
        color: p.accent,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        radius: Math.max(rect.width, rect.height) * 0.85,
      },
    }));
  };

  const moveCard = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rx: clampTilt(-py * 5),
      ry: clampTilt(px * 5),
    });
    activateNetwork(event, true);
  };

  return (
    <div
      onMouseEnter={(event) => { setHov(true); activateNetwork(event, true); }}
      onMouseMove={moveCard}
      onMouseLeave={(event) => { setHov(false); setTilt({ rx: 0, ry: 0 }); activateNetwork(event, false); }}
      style={{
        position: 'relative', borderRadius: 18,
        padding: '2px',
        background: hov ? `linear-gradient(135deg, ${p.accent}60, ${p.accent}18, transparent)` : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        transition: 'background .4s, transform .24s var(--ease), box-shadow .28s var(--ease)',
        transform: inView ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hov ? '-4px' : '0'})` : 'translateY(30px)',
        transformStyle: 'preserve-3d',
        opacity: inView ? 1 : 0,
        animation: inView ? `cardIn .6s ${delay}s var(--ease) both` : 'none',
        boxShadow: hov ? `0 0 70px ${p.accent}30, 0 26px 70px rgba(0,0,0,0.48)` : '0 4px 30px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{
        borderRadius: 16, background: 'rgba(5,7,10,0.9)',
        padding: '1.5rem', height: '100%',
        backdropFilter: 'blur(14px)',
        transform: hov ? 'translateZ(14px)' : 'translateZ(0)',
        transition: 'transform .28s var(--ease)',
      }}>
        <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)`, marginBottom: '1.1rem', opacity: hov ? 1 : 0.45, transition: 'opacity .3s' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap:'1rem', marginBottom: '0.9rem' }}>
          <div style={{ minWidth:0 }}>
            <span style={{ fontSize: '0.63rem', color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-m)' }}>◉ {p.tag}</span>
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.35rem', lineHeight:1.08 }}>{p.emoji} {p.title}</h3>
          </div>
          <span style={{ fontSize:'0.62rem', fontFamily:'var(--font-m)', color:'#fff', border:`1px solid ${p.accent}35`, background:`${p.accent}10`, padding:'0.3rem 0.55rem', borderRadius:999, whiteSpace:'nowrap' }}>{p.metric}</span>
        </div>

        {[['Problem', p.problem], ['Solution', p.solution], ['Results', p.result]].map(([lbl, txt]) => (
          <div key={lbl} style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.6rem', color: p.accent, letterSpacing: '0.12em', fontFamily: 'var(--font-m)', marginBottom: '0.22rem', textTransform: 'uppercase' }}>{lbl}</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--sub)', lineHeight: 1.58 }}>{txt}</p>
          </div>
        ))}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1rem' }}>
          {p.stack.map(t => (
            <span
              key={t}
              style={{
                fontSize: '0.68rem', fontFamily: 'var(--font-m)',
                color: '#fff', border: `1px solid ${p.accent}30`,
                background: `${p.accent}0d`, padding: '0.22rem 0.55rem', borderRadius: 5,
                transition: 'all .2s', cursor: 'default'
              }}
              onMouseEnter={e => { e.target.style.background = `${p.accent}20`; e.target.style.boxShadow = `0 0 12px ${p.accent}40`; }}
              onMouseLeave={e => { e.target.style.background = `${p.accent}0d`; e.target.style.boxShadow = 'none'; }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap:'0.45rem', marginTop:'1rem' }}>
          {[
            { label:'GitHub', href:p.github },
            { label:'Live Demo', href:'#contact' },
            { label:'Case Study', href:'#contact' },
            { label:'Architecture', href:'#contact' },
          ].map(action => (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
              style={{
                fontSize:'0.64rem',
                fontFamily:'var(--font-m)',
                color:'#fff',
                textDecoration:'none',
                textAlign:'center',
                padding:'0.45rem 0.35rem',
                borderRadius:8,
                border:'1px solid rgba(255,255,255,0.08)',
                background:'rgba(255,255,255,0.03)'
              }}
            >
              {action.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          style={{
            marginTop:'0.8rem',
            width:'100%',
            padding:'0.55rem 0.8rem',
            borderRadius:10,
            border:`1px solid ${p.accent}25`,
            background:`${p.accent}10`,
            color:'#fff',
            fontFamily:'var(--font-m)',
            fontSize:'0.68rem',
            letterSpacing:'0.08em',
            textTransform:'uppercase',
            cursor:'pointer'
          }}
        >
          {expanded ? 'Hide architecture note' : 'Show architecture note'}
        </button>

        {expanded && (
          <div style={{ marginTop:'0.75rem', padding:'0.85rem', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:'0.6rem', color:'#fff', letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-m)', marginBottom:'0.35rem' }}>Architecture preview</div>
            <div style={{ fontSize:'0.8rem', color:'var(--sub)', lineHeight:1.6 }}>
              This project is structured around a simple input-to-output flow so the logic stays explainable, testable, and easy to demo in interviews.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: 1120, margin: '0 auto' }} ref={ref}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
        <div style={{ fontSize: '0.68rem', color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-m)', whiteSpace: 'nowrap' }}>◉ Featured Work</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(124,58,237,0.4),transparent)', transformOrigin: 'left', transform: inView ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 1s var(--ease)' }} />
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.45rem,2.6vw,2rem)', fontWeight: 800, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
          Projects that <span style={{ color: '#fff' }}>matter</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.1rem' }}>
        {PROJECTS.map((p, i) => <PCard key={p.title} p={p} delay={i * 0.1} inView={inView} />)}
      </div>
    </section>
  );
}
