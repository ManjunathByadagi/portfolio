import React, { useState } from 'react';
import { useInView } from '../hooks';

const PROJECTS = [
  {
    emoji: '🤖', tag: 'AI Systems', title: 'MultiAgent AI System',
    problem: 'Traditional AI systems operate as single models and lack structured reasoning, collaboration, and iterative refinement.',
    solution: 'Built a multi-agent AI system using LangGraph with Planner, Researcher, Writer, and Critic agents. Designed an orchestration pipeline enabling step-by-step reasoning and iterative output improvement.',
    stack: ['LangGraph', 'LLMs', 'Python', 'Prompt Engineering', 'Multi-Agent Systems'],
    result: 'Improved response quality through agent collaboration · Modular and scalable AI architecture · Demonstrates real-world AI system design',
    accent: '#ff6b82', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '🛡️', tag: 'Cybersecurity AI', title: 'PhishGuard AI',
    problem: 'Phishing attacks exploit users through deceptive emails and messages, causing data breaches and financial loss. Traditional detection systems struggle with evolving attack patterns and unstructured text.',
    solution: 'Built an AI-powered phishing detection system using NLP and machine learning models. Applied TF-IDF vectorization and trained classification models to detect malicious patterns in emails. Deployed a FastAPI-based backend for real-time prediction with low-latency responses.',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'FastAPI', 'NLP', 'Docker'],
    result: 'High accuracy in phishing detection · Real-time classification API · Improved detection of unseen attack patterns',
    accent: '#8b7fff', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '📊', tag: 'Data Science', title: 'Customer Segmentation (Telco Retention)',
    problem: 'Telecom companies struggle to identify high-risk customers likely to churn. Traditional analysis fails to uncover hidden patterns in customer behavior and usage data.',
    solution: 'Built a customer segmentation system using K-Means clustering on the Telco Customer Churn dataset. Applied PCA for dimensionality reduction and visualization of clusters. Analyzed customer behavior and churn distribution across segments to identify high-risk groups.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'K-Means', 'PCA', 'Matplotlib'],
    result: 'Identified distinct customer segments with clear churn patterns · Enabled data-driven retention strategies · Improved interpretability using PCA visualization',
    accent: '#3dffa0', github: 'https://github.com/manjunath-shanmugari'
  },
  {
    emoji: '🗳️', tag: 'Blockchain', title: 'Voting System',
    problem: 'Traditional voting systems lack transparency, security, and privacy, making them vulnerable to fraud, tampering, and lack of trust in results.',
    solution: 'Built a secure blockchain-based voting system using smart contracts. Implemented voter authentication, encrypted ballots, and zero-knowledge proof-based nullifiers to ensure anonymity and prevent double voting. Designed a decentralized tallying mechanism with consensus to ensure tamper-proof and verifiable results.',
    stack: ['Solidity', 'Blockchain', 'Smart Contracts', 'Zero-Knowledge Proofs', 'Ethereum', 'Hardhat'],
    result: 'Transparent and tamper-proof voting process · Secure voter authentication · Privacy-preserving anonymous voting · Decentralized and verifiable results',
    accent: '#00e8ff', github: 'https://github.com/manjunath-shanmugari'
  },
];

function PCard({ p, delay, inView }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', borderRadius: 18,
        padding: '2px',
        background: hov ? `linear-gradient(135deg, ${p.accent}60, ${p.accent}18, transparent)` : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        transition: 'background .4s',
        transform: inView ? 'none' : 'translateY(30px)',
        opacity: inView ? 1 : 0,
        animation: inView ? `cardIn .6s ${delay}s var(--ease) both` : 'none',
        boxShadow: hov ? `0 0 60px ${p.accent}22, 0 20px 60px rgba(0,0,0,0.4)` : '0 4px 30px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{
        borderRadius: 16, background: 'rgba(11,11,24,0.95)',
        padding: '1.8rem', height: '100%',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)`, marginBottom: '1.5rem', opacity: hov ? 1 : 0.5, transition: 'opacity .3s' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.3rem' }}>
          <div>
            <span style={{ fontSize: '0.65rem', color: p.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-m)' }}>◉ {p.tag}</span>
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.3rem' }}>{p.emoji} {p.title}</h3>
          </div>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.7rem', fontFamily: 'var(--font-m)', color: 'var(--dim)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '0.28rem 0.65rem', borderRadius: 6, transition: 'all .2s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            GitHub ↗
          </a>
        </div>

        {[['⚠ Problem', p.problem], ['◈ Solution', p.solution], ['✓ Result', p.result]].map(([lbl, txt]) => (
          <div key={lbl} style={{ marginBottom: '0.9rem' }}>
            <div style={{ fontSize: '0.62rem', color: p.accent, letterSpacing: '0.1em', fontFamily: 'var(--font-m)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{lbl}</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--sub)', lineHeight: 1.65 }}>{txt}</p>
          </div>
        ))}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.2rem' }}>
          {p.stack.map(t => (
            <span
              key={t}
              style={{
                fontSize: '0.68rem', fontFamily: 'var(--font-m)',
                color: p.accent, border: `1px solid ${p.accent}30`,
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
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" style={{ padding: '7rem 2rem', maxWidth: 1120, margin: '0 auto' }} ref={ref}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--v)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-m)', whiteSpace: 'nowrap' }}>◉ Featured Work</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(139,127,255,0.4),transparent)', transformOrigin: 'left', transform: inView ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 1s var(--ease)' }} />
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
          Projects that <span style={{ color: 'var(--v)' }}>matter</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.5rem' }}>
        {PROJECTS.map((p, i) => <PCard key={p.title} p={p} delay={i * 0.1} inView={inView} />)}
      </div>
    </section>
  );
}
