# Manjunath Shanmugari — Portfolio v2 (Upgraded)

## ✨ What's New in v2

- **Typewriter animation** in Hero — cycles through roles automatically
- **Animated particle network** background with connected nodes
- **Scroll-triggered animations** on every section (fade + slide in)
- **Glowing gradient borders** on project cards that light up on hover
- **Skill bars** that animate in when scrolled into view
- **Upgraded chatbot** with:
  - 🃏 **Formatted card responses** for projects, skills, contact, resume
  - ⚡ **Quick Action buttons** (Show Projects / Skills / Contact / Resume)
  - 🖊️ **Typing animation** on bot messages (character by character)
  - 🤖 **AI Mode toggle** (rule-based ↔ Claude AI)
  - Smooth bubble animations and auto-scroll
- **Orb glow effects** in hero (floating radial gradients)
- **Active glow on navbar links** with glass effect
- **Staggered skill badge animations** on scroll

---

## 🛠 Local Setup

```bash
# Requires Node.js 16+
npm install
npm start
# → http://localhost:3000
```

---

## ☁️ Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Portfolio v2"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 2. Go to vercel.com → Add New Project → Import repo → Deploy
# Your site is live in ~60 seconds!
```

**Update after changes:**
```bash
git add . && git commit -m "update" && git push
# Vercel auto-redeploys on every push
```

---

## 🤖 Enable AI Chatbot

1. Get API key: https://console.anthropic.com
2. Create `.env` in root:
```
REACT_APP_ANTHROPIC_KEY=sk-ant-YOUR_KEY
```
3. Toggle "AI Mode ON" in the chat UI
4. Never commit `.env` (already in .gitignore)

---

## ✏️ Customize

| What to change | File |
|---|---|
| Name, links, email | `src/components/Contact.js` |
| Projects details | `src/components/Projects.js` + `src/chatbot.js` → PROJECTS_DATA |
| Skills list | `src/chatbot.js` → SKILLS_DATA |
| Chatbot responses | `src/chatbot.js` → KB object |
| Typewriter roles | `src/components/Hero.js` → TITLES array |
| Colors | `src/index.css` → :root variables |
| Resume PDF | Place `resume.pdf` in `public/` folder |

---

## 📁 Structure

```
src/
├── components/
│   ├── Navbar.js     ← Sticky nav with scroll glow
│   ├── Hero.js       ← Typewriter + particle canvas + orbs
│   ├── About.js      ← Animated skill bars + scroll reveal
│   ├── Projects.js   ← Glowing case-study cards
│   ├── Skills.js     ← Staggered badge grid
│   ├── ChatBot.js    ← Full chat UI with cards + AI mode
│   └── Contact.js    ← Glowing CTA + link cards
├── chatbot.js        ← Bot logic, KB, project/skills data
├── hooks.js          ← useInView scroll hook
├── App.js
├── index.js
└── index.css         ← All CSS vars + keyframe animations
```
