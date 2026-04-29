import React, { useState } from 'react';
import { useInView } from '../hooks';
import { SKILLS_DATA } from '../chatbot';

export default function Skills() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="skills" style={{ padding:'7rem 2rem', maxWidth:980, margin:'0 auto' }} ref={ref}>
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'3.5rem' }}>
        <div style={{ fontSize:'0.68rem', color:'var(--v)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', whiteSpace:'nowrap' }}>◉ Toolkit</div>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(139,127,255,0.4),transparent)', transformOrigin:'left', transform:inView?'scaleX(1)':'scaleX(0)', transition:'transform 1s var(--ease)' }} />
        <h2 style={{ fontFamily:'var(--font-h)', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:800, letterSpacing:'-0.03em', whiteSpace:'nowrap' }}>
          Skills & <span style={{ color:'var(--v)' }}>Technologies</span>
        </h2>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }}>
        {Object.entries(SKILLS_DATA).map(([cat, { color, items }], ci) => (
          <div key={cat} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition:`all .6s ${ci * .1}s var(--ease)` }}>
            {/* Category header */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.9rem' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:color, boxShadow:`0 0 12px ${color}` }} />
              <span style={{ fontSize:'0.68rem', color, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-m)' }}>{cat}</span>
              <div style={{ flex:1, height:'1px', background:`linear-gradient(90deg,${color}30,transparent)` }} />
            </div>
            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.55rem' }}>
              {items.map((skill, si) => (
                <button key={skill}
                  onClick={() => setActive(active === `${cat}-${skill}` ? null : `${cat}-${skill}`)}
                  style={{
                    fontSize:'0.78rem', fontFamily:'var(--font-m)',
                    padding:'0.42rem 0.9rem', borderRadius:8, cursor:'pointer',
                    color: active===`${cat}-${skill}` ? '#fff' : '#b0b0c8',
                    border:`1px solid ${active===`${cat}-${skill}` ? color : color+'25'}`,
                    background: active===`${cat}-${skill}` ? `${color}25` : `${color}0a`,
                    boxShadow: active===`${cat}-${skill}` ? `0 0 20px ${color}40, inset 0 1px 0 ${color}30` : 'none',
                    transition:'all .25s var(--ease)',
                    opacity: inView ? 1 : 0,
                    animation: inView ? `skillTag .4s ${ci * .08 + si * .03}s var(--ease) both` : 'none',
                    transform:'none'
                  }}
                  onMouseEnter={e => { if(active!==`${cat}-${skill}`) { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=color+'50'; e.currentTarget.style.background=`${color}15`; e.currentTarget.style.transform='translateY(-2px)'; }}}
                  onMouseLeave={e => { if(active!==`${cat}-${skill}`) { e.currentTarget.style.color='#b0b0c8'; e.currentTarget.style.borderColor=color+'25'; e.currentTarget.style.background=`${color}0a`; e.currentTarget.style.transform='none'; }}}
                >{skill}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
