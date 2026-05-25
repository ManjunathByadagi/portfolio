export const QUICK_ACTIONS = [
  { id: 'projects', label: 'Show Projects', color: '#7C3AED' },
  { id: 'skills', label: 'My Skills', color: '#00F5FF' },
  { id: 'contact', label: 'Contact Info', color: '#22FF88' },
  { id: 'resume', label: 'Resume', color: '#ffd166' },
];

export const PROJECTS_DATA = [
  {
    emoji: 'AI',
    name: 'MultiAgent AI System',
    tag: 'AI Systems',
    color: '#7C3AED',
    result: 'Improved response quality · Modular and scalable AI architecture',
    stack: ['LangGraph', 'LLMs', 'Python', 'Prompt Engineering'],
    aliases: ['multiagent', 'multi agent', 'multi-agent', 'agent ai', 'ai system', 'planner', 'researcher', 'writer', 'critic', 'langgraph'],
    summary: 'This project simulates how intelligent systems collaborate. Instead of using a single model, I designed a **multi-agent architecture** where different agents work together: Planner, Researcher, Writer, and Critic.',
    unique: 'Each agent has a specific role, enabling **step-by-step reasoning and iterative improvement**, similar to how human teams solve problems.',
    problem: 'Single-model AI systems often lack structured collaboration, review, and iterative refinement.',
    solution: 'I built a LangGraph-based orchestration flow where agents plan, research, write, and critique outputs in sequence.',
    impact: 'It improved response quality and created a **modular, scalable AI system** that reflects real-world AI design principles.',
  },
  {
    emoji: 'Shield',
    name: 'PhishGuard AI',
    tag: 'Cybersecurity AI',
    color: '#7C3AED',
    result: 'Real-time phishing detection · Improved accuracy against unseen threats',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'NLP', 'FastAPI', 'Docker'],
    aliases: ['shield', 'phish shield', 'phishing shield', 'phishguard', 'phishing', 'cybersecurity', 'cyber security', 'email detection', 'tf-idf', 'fastapi'],
    summary: 'PhishGuard AI focuses on detecting phishing attacks using **machine learning and NLP techniques**.',
    unique: 'It combines text feature extraction with classification models and exposes predictions through a production-style API.',
    problem: 'Traditional systems struggle with evolving phishing patterns and unstructured text.',
    solution: 'I built a model using **TF-IDF + classification algorithms** and deployed it with a **FastAPI backend** for real-time predictions.',
    impact: 'It provides **real-time phishing detection** with improved accuracy and the ability to identify unseen threats.',
  },
  {
    emoji: 'Chart',
    name: 'Customer Segmentation - Telco Retention',
    tag: 'Data Science',
    color: '#22FF88',
    result: 'Distinct churn segments · Data-driven retention strategies',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'K-Means', 'PCA'],
    aliases: ['chart', 'charts', 'segmentation chart', 'customer chart', 'customer segmentation', 'telco', 'retention', 'churn', 'k-means', 'kmeans', 'pca', 'customer analytics'],
    summary: 'This project helps telecom companies identify customers likely to churn using **unsupervised learning**.',
    unique: 'It turns behavioral customer data into interpretable segments that can guide retention decisions.',
    problem: 'Companies struggle to detect high-risk customers from complex behavioral data.',
    solution: 'I applied **K-Means clustering** and **PCA** to segment customers and visualize patterns.',
    impact: 'It enabled **data-driven retention strategies** by identifying key customer segments and churn trends.',
  },
  {
    emoji: 'Vote',
    name: 'Blockchain Voting System',
    tag: 'Blockchain',
    color: '#00F5FF',
    result: 'Tamper-proof voting · Transparent and verifiable results',
    stack: ['Solidity', 'Ethereum', 'Smart Contracts', 'Hardhat'],
    aliases: ['voting', 'vote', 'blockchain voting', 'blockchain', 'solidity', 'ethereum', 'smart contract', 'hardhat'],
    summary: 'This project addresses security and transparency issues in traditional voting systems.',
    unique: 'It uses blockchain and smart contracts to make the voting flow verifiable and harder to tamper with.',
    problem: 'Voting systems are vulnerable to fraud, tampering, and lack transparency.',
    solution: 'I built a **blockchain-based voting platform** using smart contracts with secure voter authentication.',
    impact: 'It ensures **tamper-proof, transparent, and verifiable voting**, increasing trust in the system.',
  },
];

export const SKILLS_DATA = {
  'AI/ML': { color: '#7C3AED', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'OpenCV', 'XGBoost', 'Keras'] },
  'Languages': { color: '#00F5FF', items: ['Python', 'SQL', 'JavaScript', 'C++', 'R'] },
  'Data Science': { color: '#22FF88', items: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'Spark', 'Jupyter'] },
  'MLOps & Cloud': { color: '#ff6b82', items: ['AWS', 'Docker', 'MLflow', 'GCP', 'Airflow', 'CI/CD'] },
  'Web/API': { color: '#ffd166', items: ['React', 'FastAPI', 'Flask', 'Streamlit', 'PostgreSQL', 'Redis'] },
};

function projectReply(project) {
  return {
    type: 'text',
    content:
      `**${project.name}**\n\n` +
      `${project.summary}\n\n` +
      `**What makes it unique?**\n${project.unique}\n\n` +
      `**Problem:** ${project.problem}\n\n` +
      `**Solution:** ${project.solution}\n\n` +
      `**Tech Used:** ${project.stack.join(', ')}\n\n` +
      `**Impact:** ${project.impact}`
  };
}

function findProject(input) {
  const lower = input.toLowerCase();
  if (/\b(explain|about|tell me|describe)\s+(ai|ai system|ai project)\b/.test(lower)) {
    return PROJECTS_DATA[0];
  }

  return PROJECTS_DATA.find(project =>
    project.aliases.some(alias => lower.includes(alias)) ||
    lower.includes(project.name.toLowerCase())
  );
}

const KB = {
  greet: {
    triggers: ['hi', 'hello', 'hey', 'sup', 'yo', 'howdy'],
    type: 'text',
    content: "Hey! I'm **Manju Bot**, Manjunath's AI assistant. Ask me about a specific project like **MultiAgent AI System**, **PhishGuard AI**, **Customer Segmentation**, or **Blockchain Voting System**."
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
    content: "Manjunath's resume covers his AI projects, academic background, and technical skills. Click below to download it!"
  },
  background: {
    triggers: ['background', 'about', 'who', 'student', 'study', 'college', 'education'],
    type: 'text',
    content: "Manjunath is a Computer Science student focused on **AI systems, machine learning, and real-world applications**. He builds scalable AI solutions across multi-agent systems, cybersecurity, customer analytics, and blockchain-based products."
  },
  thanks: {
    triggers: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice', 'helpful', 'good'],
    type: 'text',
    content: "Happy to help. Ask me anything else about Manjunath's projects, skills, or background."
  },
};

export function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  const project = findProject(lower);
  if (project) return projectReply(project);

  for (const [, data] of Object.entries(KB)) {
    if (data.triggers.some(t => lower.includes(t))) return data;
  }

  return {
    type: 'text',
    content: 'Great question. Try asking about **MultiAgent AI System**, **PhishGuard AI**, **Customer Segmentation**, **Blockchain Voting System**, skills, or contact.'
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
Answer questions using these project details:
1. MultiAgent AI System: multi-agent architecture with Planner, Researcher, Writer, and Critic agents. Built with LangGraph, LLMs, Python, and prompt engineering. It enables step-by-step reasoning, iterative improvement, better response quality, and modular scalable AI design.
2. PhishGuard AI: cybersecurity system for phishing detection using machine learning and NLP. Uses TF-IDF, classification algorithms, Python, Scikit-learn, FastAPI, and Docker for real-time predictions and improved detection of unseen threats.
3. Customer Segmentation - Telco Retention: unsupervised learning project for churn analysis. Uses K-Means, PCA, Python, Pandas, NumPy, and Scikit-learn to identify high-risk customer segments and support retention strategy.
4. Blockchain Voting System: secure voting platform using Solidity, Ethereum, smart contracts, and Hardhat. Focuses on voter authentication, transparency, tamper-proof voting, and verifiable results.
Skills: Python, PyTorch, TensorFlow, Scikit-learn, AWS, Docker, React, FastAPI.
Contact: manjunathbyadagi11@gmail.com | github.com/ManjunathByadagi | linkedin.com/in/manjunath-k-byadagi
Keep replies professional, friendly, and specific. Use **bold** for important terms.`,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      })
    });
    const data = await res.json();
    return { type: 'text', content: data.content?.[0]?.text || getBotReply(messages.at(-1).content).content };
  } catch {
    return getBotReply(messages.at(-1).content);
  }
}
