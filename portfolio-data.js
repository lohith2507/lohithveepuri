var PORTFOLIO_DATA = {
  name: "Lohith Datta Varma Veepuri",
  email: "lohithveepuri@gmail.com",
  phone: "+1 (913) 214-6875",
  location: "USA",
  role: "AI Software Engineer · Software Development Engineer @ Costco",
  profileImage: "images/profile.png",
  banner: {
    headline: "AI Software Engineer",
    subline: "Lohith Veepuri",
  },
  bannerTech: [
    {
      label: "Python",
      tag: "Language",
      brand: "#3776AB",
      glow: "#3776AB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      label: "Java",
      tag: "Language",
      brand: "#E76F00",
      glow: "#ED8B00",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    },
    {
      label: "AWS",
      tag: "Cloud",
      brand: "#232F3E",
      glow: "#FF9900",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      slug: "amazonwebservices",
      iconColor: "FF9900",
    },
    {
      label: "GCP",
      tag: "Cloud",
      brand: "#4285F4",
      glow: "#4285F4",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    },
    {
      label: "NVIDIA",
      tag: "AI GPU",
      brand: "#76B900",
      glow: "#76B900",
      slug: "nvidia",
      iconColor: "ffffff",
    },
    {
      label: "ChatGPT",
      tag: "LLM",
      brand: "#000000",
      glow: "#10A37F",
      logo: "images/tech/chatgpt.webp",
      logoStyle: "light",
    },
    {
      label: "Claude",
      tag: "LLM",
      brand: "#CC785C",
      glow: "#D4A574",
      slug: "anthropic",
      iconColor: "ffffff",
    },
    {
      label: "Gemini",
      tag: "LLM",
      brand: "#4285F4",
      glow: "#8E75B2",
      slug: "googlegemini",
      iconColor: "ffffff",
    },
    {
      label: "LangChain",
      tag: "Agents",
      brand: "#1C3C3C",
      glow: "#22d3ee",
      logo: "images/tech/langchain.webp",
      logoStyle: "dark",
    },
    {
      label: "LLM",
      tag: "Models",
      custom: "llm",
      brand: "#8b5cf6",
      glow: "#a78bfa",
    },
    {
      label: "AI Agents",
      tag: "Agents",
      custom: "agent",
      brand: "#0ea5e9",
      glow: "#38bdf8",
    },
    {
      label: "Kimi K2.5",
      tag: "LLM",
      custom: "kimi",
      brand: "#ec4899",
      glow: "#f472b6",
    },
  ],
  resumePdf: "Lohith_Veepuri_SDE.pdf",
  links: {
    leetcode: "https://leetcode.com/u/lohithv2507/",
    linkedin: "https://www.linkedin.com/in/lohithveepuri/",
    github: "https://github.com/lohith2507/",
  },
  recruiterPitch:
    "Open to Software Engineer & AI/ML roles · Costco · AMD · JPMorgan Chase · M.S. CS (GPA 3.85)",
  tagline:
    "Building secure, reliable distributed systems with Java, C++, Python, and cloud-native architecture.",
  bio: "Software Development Engineer with 5+ years of experience designing and building secure, reliable, large-scale distributed systems using Java, C++, and Python. Strong foundation in object-oriented design, design patterns, and full SDLC including coding standards, code reviews, build processes, testing, and operations.",
  social: [
    { label: "LinkedIn", value: "lohithveepuri", hrefKey: "linkedin", icon: "linkedin" },
    { label: "GitHub", value: "lohith2507", hrefKey: "github", icon: "github" },
    { label: "LeetCode", value: "lohithv2507", hrefKey: "leetcode", icon: "leetcode" },
  ],
  roles: [
    "Software Development Engineer",
    "Distributed Systems Engineer",
    "Cloud & AI/ML Engineer",
  ],
  stats: [
    { value: "5+", label: "Years" },
    { value: "12+", label: "Projects" },
    { value: "50K+", label: "IoT Scale" },
    { value: "∞", label: "Curiosity" },
  ],
  experience: [
    {
      company: "Costco",
      logo: "images/companies/costco.webp",
      domain: "costco.com",
      brandColor: "#E31837",
      title: "Software Engineer",
      period: "Jan 2026 - Present",
      bullets: [
        "Spearheaded end-to-end migration of Costco's monolithic e-commerce platform to secure, distributed microservices using Java Spring Boot, cutting system downtime by 30% and reducing unauthorized access attempts by 50% via JWT/OAuth2.0.",
        "Integrated LLM-based features and AI-assisted development workflows using OpenAI APIs and GitHub Copilot, reducing development cycle time by 30%.",
        "Automated CI/CD pipelines using Jenkins and GitHub Actions with rollback strategies, slashing deployment errors by 80%.",
        "Partnered cross-functionally to define coding standards and mentor junior engineers on microservices design patterns.",
      ],
    },
    {
      company: "AMD",
      logoSlug: "amd",
      domain: "amd.com",
      brandColor: "#ED1C24",
      title: "Software Development Engineer",
      period: "Jan 2025 - Jan 2026",
      bullets: [
        "Built and maintained secure, multi-tiered backend services in Java and Python for AMD's semiconductor platform.",
        "Designed role-based access control and federated identity APIs, improving authentication accuracy by 40%.",
        "Integrated ML-based predictive models using TensorFlow and scikit-learn, reducing data preprocessing time by 25%.",
        "Established comprehensive unit and integration testing practices across production components.",
      ],
    },
    {
      company: "JPMorgan Chase - TCS",
      logoSlug: "jpmorganchase",
      domain: "jpmorganchase.com",
      brandColor: "#0066B1",
      title: "Software Engineer",
      period: "Feb 2021 - Aug 2023",
      bullets: [
        "Architected large-scale distributed microservices for financial transactions using Java Spring Boot and AWS EKS, reducing API latency by 35%.",
        "Owned the full technology stack for mission-critical banking services.",
        "Built secure, event-driven data pipelines using AWS SQS, SNS, and EventBridge, cutting reporting latency by 80%.",
        "Owned end-to-end CI/CD in AWS CodePipeline and GitHub Actions, reducing deployment failures by 90%.",
        "Migrated legacy banking services to AWS Lambda, reducing infrastructure costs by 20%.",
      ],
    },
  ],
  education: [
    {
      school: "University of Central Missouri",
      degree: "M.S. in Computer Science",
      detail: "GPA: 3.85",
    },
    {
      school: "Velagapudi Ramakrishna Siddhartha Engineering College",
      degree: "B.Tech. in Electronics & Communication Engineering",
      detail: "",
    },
  ],
  projects: [
    {
      name: "AI-Powered Financial Insights Dashboard",
      icon: "finance",
      stack: "Python, FastAPI, React, OpenAI API, PostgreSQL",
      bullets: [
        "Built a full-stack application that ingests transaction data and uses LLM-based summarization to generate plain-English financial insights and anomaly alerts.",
        "Designed a RAG pipeline to ground AI responses in real user data, improving response accuracy by 40%.",
        "Deployed containerized backend on AWS ECS with Docker, achieving sub-200ms API response times under high concurrency.",
      ],
    },
    {
      name: "Intelligent Code Review Assistant",
      icon: "code",
      stack: "Python, LangChain, GitHub API, React, Azure",
      bullets: [
        "Developed an agentic AI tool that automatically reviews pull requests and posts structured feedback as GitHub comments.",
        "Integrated LangGraph-based multi-step reasoning, reducing manual review time by 50%.",
        "Deployed as a GitHub Actions workflow for zero-friction CI/CD integration.",
      ],
    },
    {
      name: "AI-Powered Fraud Detection System",
      icon: "fraud",
      stack: "Python, Scikit-learn, Pandas",
      bullets: [
        "Built real-time anomaly detection on transactional data.",
        "Applied ML algorithms to identify suspicious patterns.",
      ],
    },
    {
      name: "AI for Predictive Healthcare Diagnosis",
      icon: "healthcare",
      stack: "Python, TensorFlow, Healthcare datasets",
      bullets: [
        "Developed ML model to predict diseases from patient history and symptoms.",
        "Improved diagnostic pattern recognition using classification algorithms.",
      ],
    },
    {
      name: "AI-Based Recommendation System for E-Commerce",
      icon: "ecommerce",
      stack: "Python, Surprise library, SQL",
      bullets: [
        "Built collaborative and content-based filtering recommendation engine.",
        "Increased simulated product click-through rate through personalization.",
      ],
    },
    {
      name: "AI for Social Media Sentiment Analysis",
      icon: "sentiment",
      stack: "Python, NLTK, HuggingFace, Twitter API",
      bullets: [
        "Designed NLP pipeline to classify public sentiment from social media data.",
        "Processed and analyzed 10,000+ tweets/posts.",
      ],
    },
    {
      name: "AI-Powered Chatbot for Customer Support",
      icon: "chatbot",
      stack: "Python, Rasa, Dialogflow, REST API",
      bullets: [
        "Developed NLP-based chatbot for multi-turn customer support conversations.",
        "Reduced simulated response time with intent recognition and entity extraction.",
      ],
    },
  ],
  skillCategories: [
    {
      label: "Core",
      skills: ["Java", "C++", "Python", "JavaScript", "TypeScript", "C#", "SQL"],
    },
    {
      label: "Security & Architecture",
      skills: [
        "JWT",
        "OAuth2.0",
        "RBAC",
        "Microservices",
        "Distributed Systems",
        "Design Patterns",
      ],
    },
    {
      label: "Cloud & DevOps",
      skills: [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Jenkins",
        "CI/CD",
      ],
    },
    {
      label: "Data & AI",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "TensorFlow",
        "OpenAI API",
        "RAG",
        "scikit-learn",
      ],
    },
    {
      label: "Practices",
      skills: ["Agile/Scrum", "TDD", "Code Reviews", "Full SDLC", "Postman"],
    },
  ],
  strengths: [
    "Distributed systems at scale",
    "Secure authentication & APIs",
    "Cloud-native delivery",
    "AI/ML integration in production",
  ],
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PORTFOLIO_DATA };
}
