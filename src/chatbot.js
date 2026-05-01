export const QUICK_ACTIONS = [
  { id: 'projects', label: '🔬 Show Projects', color: '#7C3AED' },
  { id: 'skills', label: '⚡ My Skills', color: '#00F5FF' },
  { id: 'contact', label: '📬 Contact Info', color: '#22FF88' },
  { id: 'resume', label: '📄 Resume', color: '#ffd166' },
];

export const PROJECTS_DATA = [
  { emoji: '🤖', name: 'MultiAgent AI System', tag: 'AI Systems', color: '#ff6b82', result: 'Improved response quality · Modular and scalable AI architecture', stack: ['LangGraph', 'LLMs', 'Python', 'Prompt Engineering'] },
  { emoji: '🛡️', name: 'PhishGuard AI', tag: 'Cybersecurity AI', color: '#7C3AED', result: 'High accuracy in phishing detection · Real-time classification API', stack: ['Python', 'Scikit-learn', 'TF-IDF', 'FastAPI'] },
  { emoji: '📊', name: 'Customer Segmentation (Telco Retention)', tag: 'Data Science', color: '#22FF88', result: 'Distinct churn segments · Data-driven retention strategies', stack: ['Python', 'Scikit-learn', 'Pandas', 'PCA'] },
  { emoji: '🗳️', name: 'Voting System', tag: 'Blockchain', color: '#00F5FF', result: 'Transparent and tamper-proof voting · Anonymous and verifiable results', stack: ['Solidity', 'Blockchain', 'Ethereum', 'Hardhat'] },
];

export const SKILLS_DATA = {
  'ML / AI': { color: '#7C3AED', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'OpenCV', 'XGBoost', 'Keras'] },
  'Languages': { color: '#00F5FF', items: ['Python', 'SQL', 'JavaScript', 'C++', 'R'] },
  'Data Science': { color: '#22FF88', items: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'Spark', 'Jupyter'] },
  'MLOps & Cloud': { color: '#ff6b82', items: ['AWS', 'Docker', 'MLflow', 'GCP', 'Airflow', 'CI/CD'] },
  'Web & APIs': { color: '#ffd166', items: ['React', 'FastAPI', 'Flask', 'Streamlit', 'PostgreSQL', 'Redis'] },
};

const KB = {
  greet: {
    triggers: ['hi', 'hello', 'hey', 'sup', 'yo', 'howdy'],
    type: 'text',
    content: "Hey! 👋 I'm **Manju Bot** — Manjunath's AI assistant. Ask me anything about his work, skills, or how to get in touch. You can also hit the quick buttons below!"
  },
  projects: {
    triggers: ['project', 'work', 'built', 'case', 'portfolio', 'show project'],
    type: 'projects',
    content: null
  },
  skills: {
    triggers: ['skill', 'tech', 'stack', 'language', 'framework', 'tools', 'expertise', 'know'],
    type: 'skills',
    content: null
  },
  contact: {
    triggers: ['contact', 'reach', 'email', 'hire', 'linkedin', 'github', 'connect', 'touch'],
    type: 'contact',
    content: null
  },
  resume: {
    triggers: ['resume', 'cv', 'download'],
    type: 'resume',
    content: "Manjunath's resume covers his AI projects, academic background, and technical skills. Click below to download it! 📄"
  },
  background: {
    triggers: ['background', 'about', 'who', 'student', 'study', 'college', 'education'],
    type: 'text',
    content: "Manjunath is a Computer Science student focused on **AI systems, machine learning, and real-world applications**. He builds scalable AI solutions across multi-agent systems, cybersecurity, customer analytics, and blockchain-based products. 🎓"
  },
  thanks: {
    triggers: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice', 'helpful', 'good'],
    type: 'text',
    content: "Happy to help! 😊 Ask me anything else about Manjunath's projects, skills, or background."
  },
};

export function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  for (const [, data] of Object.entries(KB)) {
    if (data.triggers.some(t => lower.includes(t))) return data;
  }
  return {
    type: 'text',
    content: 'Great question! Try asking about **projects**, **skills**, or **contact** — or hit a quick button below. 🤖'
  };
}

export async function getAIReply(messages) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are Manju Bot, an AI assistant for Manjunath Byadagi's portfolio.
Answer questions about: MultiAgent AI System (LangGraph-based multi-agent orchestration with Planner, Researcher, Writer, and Critic agents), PhishGuard AI (AI-powered phishing detection with NLP, TF-IDF, and FastAPI), Customer Segmentation (Telco Retention) (K-Means clustering with PCA for churn analysis), Voting System (blockchain voting with smart contracts and zero-knowledge proof-based privacy).
Skills: Python, PyTorch, TensorFlow, Scikit-learn, AWS, Docker, React, FastAPI.
Contact: manjunathbyadagi11@gmail.com | github.com/ManjunathByadagi | linkedin.com/in/manjunath-k-byadagi
Keep replies SHORT (2-4 sentences), professional, friendly. Use **bold** for emphasis. No long paragraphs.`,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      })
    });
    const data = await res.json();
    return { type: 'text', content: data.content?.[0]?.text || getBotReply(messages.at(-1).content).content };
  } catch {
    return getBotReply(messages.at(-1).content);
  }
}
