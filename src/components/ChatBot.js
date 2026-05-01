import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getBotReply, getAIReply, QUICK_ACTIONS, PROJECTS_DATA, SKILLS_DATA } from '../chatbot';

/* ── Sub-components for rich message types ── */

function TypingDots() {
  return (
    <div style={{ display:'flex', gap:5, padding:'2px 0', alignItems:'center' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'var(--v)', animation:`bounce 1.2s ${i*.2}s infinite ease-in-out` }} />
      ))}
    </div>
  );
}

function ProjectCards() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginTop:'0.3rem' }}>
      {PROJECTS_DATA.map(p => (
        <div key={p.name} style={{
          display:'flex', alignItems:'center', gap:'0.75rem',
          padding:'0.65rem 0.85rem', borderRadius:10,
          background:'rgba(255,255,255,0.04)',
          border:`1px solid ${p.color}25`,
          transition:'all .2s', cursor:'default'
        }}
        onMouseEnter={e => { e.currentTarget.style.background=`${p.color}0d`; e.currentTarget.style.borderColor=`${p.color}50`; }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor=`${p.color}25`; }}
        >
          <span style={{ fontSize:'1.3rem' }}>{p.emoji}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'var(--font-h)', fontWeight:700, fontSize:'0.85rem', color:'#fff' }}>{p.name}</div>
            <div style={{ fontSize:'0.68rem', color:p.color, fontFamily:'var(--font-m)', marginTop:'0.1rem' }}>{p.tag}</div>
          </div>
          <div style={{ fontSize:'0.68rem', color:'var(--sub)', fontFamily:'var(--font-m)', textAlign:'right', minWidth:0, flexShrink:0, maxWidth:160 }}>{p.result}</div>
        </div>
      ))}
    </div>
  );
}

function SkillCards() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginTop:'0.3rem' }}>
      {Object.entries(SKILLS_DATA).map(([cat, { color, items }]) => (
        <div key={cat} style={{ padding:'0.65rem 0.85rem', borderRadius:10, background:'rgba(255,255,255,0.04)', border:`1px solid ${color}20` }}>
          <div style={{ fontSize:'0.65rem', color, fontFamily:'var(--font-m)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.5rem' }}>◉ {cat}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
            {items.map(s => (
              <span key={s} style={{ fontSize:'0.68rem', fontFamily:'var(--font-m)', color:'var(--sub)', background:`${color}0d`, border:`1px solid ${color}20`, padding:'0.2rem 0.5rem', borderRadius:5 }}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCard() {
  const [copied, setCopied] = useState(false);
  const links = [
    { icon:'📧', label:'Email', value:'manjunathbyadagi11@gmail.com', href:'mailto:manjunathbyadagi11@gmail.com', color:'#ff6b82', copy:true },
    { icon:'💼', label:'LinkedIn', value:'linkedin.com/in/manjunath-k-byadagi', href:'https://www.linkedin.com/in/manjunath-k-byadagi/', color:'#00F5FF' },
    { icon:'🐙', label:'GitHub', value:'github.com/ManjunathByadagi', href:'https://github.com/ManjunathByadagi', color:'#7C3AED' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.55rem', marginTop:'0.3rem' }}>
      {links.map(l => (
        <div key={l.label} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.85rem', borderRadius:10, background:'rgba(255,255,255,0.04)', border:`1px solid ${l.color}25` }}>
          <span style={{ fontSize:'1rem' }}>{l.icon}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'0.7rem', color:l.color, fontFamily:'var(--font-m)', letterSpacing:'0.06em' }}>{l.label}</div>
            <a href={l.href} target="_blank" rel="noreferrer" style={{ fontSize:'0.75rem', color:'var(--sub)', fontFamily:'var(--font-m)', textDecoration:'none' }}>{l.value}</a>
          </div>
          {l.copy && (
            <button onClick={() => { navigator.clipboard.writeText(l.value); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
              style={{ fontSize:'0.65rem', fontFamily:'var(--font-m)', background:'transparent', border:`1px solid ${copied?'var(--g)':'rgba(255,255,255,0.1)'}`, color:copied?'var(--g)':'var(--dim)', padding:'0.25rem 0.5rem', borderRadius:5, cursor:'pointer', transition:'all .2s', whiteSpace:'nowrap' }}>
              {copied?'✓ Copied':'⧉ Copy'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ResumeCard() {
  return (
    <div style={{ padding:'1rem', borderRadius:10, background:'rgba(255,213,102,0.06)', border:'1px solid rgba(255,213,102,0.2)', marginTop:'0.3rem', textAlign:'center' }}>
      <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>📄</div>
      <div style={{ fontSize:'0.82rem', fontFamily:'var(--font-h)', fontWeight:700, marginBottom:'0.4rem' }}>Manjunath's Resume</div>
      <div style={{ fontSize:'0.72rem', color:'var(--sub)', fontFamily:'var(--font-m)', marginBottom:'0.8rem' }}>ML projects · Skills · Academic background</div>
      <a href="/resume.pdf" download style={{
        display:'inline-block', background:'linear-gradient(135deg,#ffd166,#ffaa00)',
        color:'#0a0800', padding:'0.5rem 1.4rem', borderRadius:8,
        fontSize:'0.75rem', fontFamily:'var(--font-m)', fontWeight:600,
        textDecoration:'none', letterSpacing:'0.06em'
      }}>↓ Download PDF</a>
    </div>
  );
}

/* ── TypeWriter for bot messages ── */
function TypedMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); onDone?.(); }
    }, 14);
    return () => clearInterval(id);
  }, [text, onDone]);

  return <FormattedText text={displayed} showCursor={!done} />;
}

function FormattedText({ text, showCursor }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p style={{ margin:0, lineHeight:1.65, fontSize:'0.84rem', fontFamily:'var(--font-m)' }}>
      {parts.map((p, i) => p.startsWith('**') && p.endsWith('**')
        ? <strong key={i} style={{ color:'var(--text)', fontWeight:600 }}>{p.slice(2,-2)}</strong>
        : <span key={i}>{p}</span>
      )}
      {showCursor && <span style={{ borderRight:'2px solid var(--v)', marginLeft:1, animation:'typeCursor .8s infinite' }}>&nbsp;</span>}
    </p>
  );
}

/* ── Message bubble ── */
function Bubble({ msg, isNew }) {
  const isUser = msg.role === 'user';
  const [typeDone, setTypeDone] = useState(!isNew || isUser);

  const content = msg.type === 'projects' ? <><FormattedText text="Here are Manjunath's 4 featured projects:" /><ProjectCards /></>
    : msg.type === 'skills'   ? <><FormattedText text="Manjunath's full technical stack:" /><SkillCards /></>
    : msg.type === 'contact'  ? <><FormattedText text="Here's how to reach Manjunath:" /><ContactCard /></>
    : msg.type === 'resume'   ? <><FormattedText text={msg.content} /><ResumeCard /></>
    : isNew && !isUser
      ? <TypedMessage text={msg.content} onDone={() => setTypeDone(true)} />
      : <FormattedText text={msg.content} />;

  return (
    <div style={{ display:'flex', justifyContent:isUser?'flex-end':'flex-start', gap:'0.6rem', alignItems:'flex-end', animation:'fadeUp .3s var(--ease) both' }}>
      {!isUser && (
        <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,var(--v),var(--c))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', flexShrink:0, boxShadow:'0 0 12px rgba(124,58,237,0.4)' }}>🤖</div>
      )}
      <div style={{
        maxWidth:'76%', padding:'0.75rem 1rem',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? 'linear-gradient(135deg,#7a6fff,#5a4fdf)' : 'rgba(255,255,255,0.045)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: isUser ? '0 4px 20px rgba(122,111,255,0.3)' : 'none',
        color:'var(--text)',
      }}>
        {content}
        <div style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.28)', marginTop:'0.4rem', textAlign:'right' }}>
          {msg.time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
}

/* ── Main ChatBot ── */
export default function ChatBot() {
  const [messages, setMessages] = useState([{
    id:0, role:'assistant', type:'text',
    content:"Hey! 👋 I'm **Manju Bot** — Manjunath's AI assistant. Ask me about his projects, skills, or how to get in touch. Try the quick buttons below!",
    time: new Date(), isNew:true
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [newMsgIds, setNewMsgIds] = useState(new Set([0]));
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, typing]);

  const send = useCallback(async (text) => {
    if (!text.trim() || typing) return;
    const uid = Date.now();
    const userMsg = { id:uid, role:'user', type:'text', content:text.trim(), time:new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise(r => setTimeout(r, 500 + Math.random() * 700));

    let reply;
    if (aiMode) {
      const hist = [...messages, userMsg].map(m => ({ role:m.role, content:m.content || (m.type==='projects'?'Here are the projects':m.type) }));
      reply = await getAIReply(hist);
    } else {
      reply = getBotReply(text);
    }

    const botId = Date.now() + 1;
    setNewMsgIds(prev => new Set([...prev, botId]));
    setMessages(prev => [...prev, { id:botId, role:'assistant', ...reply, content: reply.content || '', time:new Date() }]);
    setTyping(false);
  }, [messages, typing, aiMode]);

  const sendQuickAction = useCallback(async (id) => {
    if (typing) return;

    const labels = {
      projects: 'Show me your projects',
      skills: 'What are your skills?',
      contact: 'How can I contact you?',
      resume: 'Can I download your resume?'
    };

    const replies = {
      projects: { type: 'projects', content: '' },
      skills: { type: 'skills', content: '' },
      contact: { type: 'contact', content: '' },
      resume: {
        type: 'resume',
        content: "Manjunath's resume covers his AI projects, academic background, and technical skills. Click below to download it! 📄"
      }
    };

    const userMsg = { id: Date.now(), role: 'user', type: 'text', content: labels[id] || id, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 250));

    const botId = Date.now() + 1;
    setNewMsgIds(prev => new Set([...prev, botId]));
    setMessages(prev => [...prev, { id: botId, role: 'assistant', ...replies[id], time: new Date() }]);
    setTyping(false);
  }, [typing]);

  function onKey(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }

  return (
    <section id="chat" style={{ padding:'7rem 2rem', maxWidth:820, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'3rem' }}>
        <div style={{ fontSize:'0.68rem', color:'var(--v)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-m)', whiteSpace:'nowrap' }}>◉ Interactive</div>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(124,58,237,0.4),transparent)' }} />
        <h2 style={{ fontFamily:'var(--font-h)', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:800, letterSpacing:'-0.03em', whiteSpace:'nowrap' }}>
          Chat with <span style={{ color:'var(--v)' }}>Manju Bot</span>
        </h2>
      </div>

      {/* Chat window */}
      <div style={{
        borderRadius:20, overflow:'hidden',
        border:'1px solid rgba(255,255,255,0.07)',
        background:'rgba(7,16,26,0.8)',
        backdropFilter:'blur(20px)',
        boxShadow:'0 0 80px rgba(124,58,237,0.1), 0 40px 80px rgba(0,0,0,0.5)'
      }}>
        {/* Chat header bar */}
        <div style={{
          padding:'0.9rem 1.4rem',
          background:'rgba(124,58,237,0.06)',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          display:'flex', alignItems:'center', justifyContent:'space-between'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ position:'relative' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--v),var(--c))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', boxShadow:'0 0 16px rgba(124,58,237,0.5)' }}>🤖</div>
              <div style={{ position:'absolute', bottom:1, right:1, width:8, height:8, borderRadius:'50%', background:'var(--g)', border:'2px solid #07101a', boxShadow:'0 0 6px var(--g)' }} />
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-h)', fontWeight:700, fontSize:'0.9rem' }}>Manju Bot</div>
              <div style={{ fontSize:'0.62rem', color:'var(--g)', fontFamily:'var(--font-m)' }}>◉ online · {aiMode ? 'AI Mode' : 'Smart Mode'}</div>
            </div>
          </div>
          {/* AI toggle */}
          <button onClick={() => setAiMode(!aiMode)} style={{
            display:'flex', alignItems:'center', gap:'0.5rem',
            padding:'0.35rem 0.9rem', borderRadius:20, cursor:'pointer',
            background: aiMode ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${aiMode ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: aiMode ? 'var(--v)' : 'var(--dim)',
            fontSize:'0.68rem', fontFamily:'var(--font-m)', letterSpacing:'0.06em',
            transition:'all .25s', boxShadow: aiMode ? '0 0 16px rgba(124,58,237,0.25)' : 'none'
          }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background: aiMode ? 'var(--v)' : 'var(--dim)', boxShadow: aiMode ? '0 0 8px var(--v)' : 'none', transition:'all .25s' }} />
            AI Mode {aiMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Messages */}
        <div style={{ height:440, overflowY:'auto', padding:'1.4rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
          {messages.map(msg => (
            <Bubble key={msg.id} msg={msg} isNew={newMsgIds.has(msg.id)} />
          ))}
          {typing && (
            <div style={{ display:'flex', gap:'0.6rem', alignItems:'flex-end', animation:'fadeUp .3s var(--ease) both' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,var(--v),var(--c))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem' }}>🤖</div>
              <div style={{ padding:'0.75rem 1rem', borderRadius:'16px 16px 16px 4px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick action buttons */}
        <div style={{ padding:'0.75rem 1.4rem', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'0.5rem', flexWrap:'wrap', background:'rgba(0,0,0,0.2)' }}>
          {QUICK_ACTIONS.map(qa => (
            <button key={qa.id} onClick={() => sendQuickAction(qa.id)}
              style={{
                fontSize:'0.7rem', fontFamily:'var(--font-m)', cursor:'pointer',
                padding:'0.35rem 0.8rem', borderRadius:20,
                background:`${qa.color}0d`, color: qa.color,
                border:`1px solid ${qa.color}30`,
                transition:'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background=`${qa.color}20`; e.currentTarget.style.boxShadow=`0 0 12px ${qa.color}30`; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${qa.color}0d`; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}
            >{qa.label}</button>
          ))}
        </div>

        {/* Input area */}
        <div style={{ padding:'1rem 1.4rem', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:'0.75rem', alignItems:'center' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about projects, skills, contact..."
            style={{
              flex:1, background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.09)',
              borderRadius:10, padding:'0.75rem 1rem',
              color:'var(--text)', fontFamily:'var(--font-m)',
              fontSize:'0.84rem', outline:'none', transition:'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.45)'}
            onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.09)'}
          />
          <button onClick={() => send(input)} disabled={!input.trim() || typing}
            style={{
              background: input.trim() && !typing ? 'linear-gradient(135deg,var(--v),var(--c))' : 'rgba(255,255,255,0.05)',
              color: input.trim() && !typing ? '#fff' : 'var(--dim)',
              border:'none', borderRadius:10, padding:'0.75rem 1.2rem',
              cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
              fontSize:'1.1rem', transition:'all .2s',
              boxShadow: input.trim() && !typing ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
            }}>→</button>
        </div>
      </div>
    </section>
  );
}
