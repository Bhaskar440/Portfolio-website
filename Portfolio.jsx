import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Certifications", "Contact"];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI"],
  "State Management": ["Zustand"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  "Tools & Platforms": ["Git", "GitHub", "Clerk", "Cloudinary", "Postman"],
  Concepts: ["Responsive Design", "Performance Optimization", "API Integration", "Component-Based Architecture"],
};

const PROJECTS = [
  {
    title: "AI Node-Based Editor",
    tech: ["Next.js 14", "Tailwind CSS", "Zustand", "Replicate API", "Clerk"],
    points: [
      "Developed a node-based visual editor enabling real-time AI image and video generation using a drag-and-drop pipeline architecture (Text → Model → Output).",
      "Built interactive draggable nodes with inputs, selectors, and live states (Idle, Loading, Success, Error), improving workflow efficiency by ~40%.",
      "Enabled secure authentication and protected routes using Clerk Authentication for safe and personalized user sessions.",
    ],
    link: "https://github.com/Bhaskar440",
    color: "from-violet-600 to-indigo-600",
    accent: "#7c3aed",
    num: "01",
  },
  {
    title: "ReAi",
    tech: ["React.js", "Next.js", "Gemini API", "Inngest", "Shadcn UI"],
    points: [
      "Developed an AI-powered Career Coaching platform using React 19, Next.js 15, and Tailwind CSS, enabling real-time career guidance and job interview preparation.",
      "Implemented secure authentication and user management with Clerk Authentication, ensuring GDPR-compliant onboarding and role-based access control.",
      "Integrated Gemini API with Inngest workflows to automate AI-driven resume reviews, mock interviews, and personalized career insights, reducing response latency.",
    ],
    link: "#",
    color: "from-emerald-500 to-teal-600",
    accent: "#059669",
    num: "02",
  },
];

const EXPERIENCE = [
  {
    role: "Family Caregiver & Household Management",
    company: "Personal Sabbatical",
    location: "Kanpur",
    period: "May 2025 – March 2026",
    icon: "🏠",
    points: [
      "Managed full-time specialized care and medical logistics for a family member during a critical recovery period.",
      "Handled household administration, financial planning, and personal responsibilities, demonstrating strong resilience and time management."
    ]
  }
];

const EDUCATION = [
  {
    degree: "Master of Computer Applications",
    school: "Chandigarh University",
    period: "Aug 2023 – May 2025",
    grade: "6.95 CGPA",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "Kanpur Institute of Technology",
    period: "Nov 2020 – May 2023",
    grade: "7.52 CGPA",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function GlowDot({ className }) {
  return <span className={`inline-block w-2 h-2 rounded-full ${className}`} />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const roles = ["Frontend Developer", "React.js Expert", "Next.js Builder", "UI/UX Enthusiast"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) { deleting.current = true; return 1800; }
      } else {
        setTypedText(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % roles.length; return 400; }
      }
      return deleting.current ? 60 : 100;
    };
    let timeout;
    const run = () => { const next = tick(); timeout = setTimeout(run, next); };
    timeout = setTimeout(run, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id.toLowerCase());
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120 && top > -200) setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white font-sans selection:bg-violet-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080b14; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 4px; }
        .grid-bg { background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px); background-size: 50px 50px; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(124,58,237,0.15); }
        .tag { display: inline-block; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25); color: #a78bfa; border-radius: 999px; padding: 3px 12px; font-size: 12px; font-weight: 500; }
        .glow-text { text-shadow: 0 0 40px rgba(124,58,237,0.5); }
        .underline-anim { position: relative; }
        .underline-anim::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1.5px; background: #7c3aed; transition: width 0.3s ease; }
        .underline-anim:hover::after { width: 100%; }
        .border-grad { border: 1px solid transparent; background: linear-gradient(#0f1220, #0f1220) padding-box, linear-gradient(135deg, rgba(124,58,237,0.4), rgba(16,185,129,0.2)) border-box; }
        .skill-pill { background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); color: #c4b5fd; border-radius: 8px; padding: 6px 14px; font-size: 13px; transition: all 0.2s; }
        .skill-pill:hover { background: rgba(124,58,237,0.18); border-color: rgba(124,58,237,0.5); }
        .timeline-line { position: absolute; left: 19px; top: 40px; bottom: 0; width: 1px; background: linear-gradient(to bottom, rgba(124,58,237,0.5), transparent); }
        .cursor { display: inline-block; width: 2px; height: 1em; background: #7c3aed; margin-left: 2px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); }
      `}</style>

      <div className="noise" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080b14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display font-800 text-xl tracking-tight">
            <span className="text-violet-400">B</span>haskar<span className="text-violet-400">.</span>
          </span>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                className={`px-4 py-2 text-sm rounded-lg transition-all font-body underline-anim ${activeSection === l ? "text-violet-400 bg-violet-500/10" : "text-gray-400 hover:text-white"}`}>
                {l}
              </button>
            ))}
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(o => !o)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-2 bg-[#080b14]/95">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} className="text-left py-2 text-sm text-gray-300 hover:text-violet-400 transition-colors font-body">{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" className="relative min-h-screen flex items-center grid-bg pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
                <GlowDot className="bg-emerald-400 animate-pulse" />
                <span className="text-sm text-violet-300 font-body">Available for opportunities</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-4 glow-text">
                Bhaskar<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Shukla</span>
              </h1>
              <div className="font-display text-xl md:text-2xl text-gray-300 mb-6 h-9 flex items-center">
                <span className="text-violet-400">&lt;</span>
                <span className="ml-2 text-white">{typedText}</span>
                <span className="cursor" />
                <span className="text-violet-400 ml-1">/&gt;</span>
              </div>
              <p className="font-body text-gray-400 text-base leading-relaxed mb-8 max-w-md">
                Frontend developer passionate about building high-performance, beautiful web experiences using React.js, Next.js & modern tooling. I turn ideas into pixel-perfect, responsive interfaces.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("Projects")} className="font-body bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25">
                  View Projects →
                </button>
                <a href="mailto:bhaskarshukla440@gmail.com" className="font-body border border-white/10 hover:border-violet-500/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-sm font-medium transition-all">
                  Get in Touch
                </a>
              </div>
              <div className="flex items-center gap-5 mt-8">
                <a href="https://github.com/Bhaskar440" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/bhaskarshukla2112" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="tel:9455215962" className="text-gray-500 hover:text-violet-400 transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl border-grad p-1">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-violet-900/40 to-indigo-900/30 flex items-center justify-center">
                    <div className="font-display text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-indigo-300">BS</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-[#0f1220] border border-violet-500/20 rounded-2xl px-4 py-3 shadow-xl">
                  <div className="text-xs text-gray-400 font-body">Experience</div>
                  <div className="font-display font-bold text-white text-lg">6+ months</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#0f1220] border border-violet-500/20 rounded-2xl px-4 py-3 shadow-xl">
                  <div className="text-xs text-gray-400 font-body">Projects</div>
                  <div className="font-display font-bold text-white text-lg">2+ Built</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Expertise</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Technical Skills</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.08}>
                <div className="border-grad rounded-2xl p-6 card-hover h-full">
                  <h3 className="font-display font-semibold text-violet-300 text-sm uppercase tracking-wider mb-4">{cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map(s => <span key={s} className="skill-pill font-body">{s}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Portfolio</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Featured Projects</h2>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-8">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="border-grad rounded-3xl p-8 card-hover">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center font-display font-bold text-lg text-white`}>
                        {p.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                        <a href={p.link} target="_blank" rel="noreferrer"
                          className="text-xs font-body border border-white/10 hover:border-violet-500/40 text-gray-400 hover:text-violet-400 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                          <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          GitHub
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tech.map(t => <span key={t} className="tag font-body">{t}</span>)}
                      </div>
                      <ul className="space-y-2">
                        {p.points.map((pt, j) => (
                          <li key={j} className="flex gap-3 text-sm text-gray-400 font-body leading-relaxed">
                            <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Work History</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Experience</h2>
            </div>
          </FadeIn>
          <div className="relative pl-10">
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative mb-10">
                  {i < EXPERIENCE.length - 1 && <div className="timeline-line" />}
                  <div className="absolute -left-10 w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-lg">
                    {e.icon}
                  </div>
                  <div className="border-grad rounded-2xl p-6 card-hover">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-white text-xl">{e.role}</h3>
                        <p className="text-violet-300 font-body text-sm mt-0.5">{e.company} · {e.location}</p>
                      </div>
                      <span className="text-xs font-body bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-full whitespace-nowrap">{e.period}</span>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {e.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-sm text-gray-400 font-body leading-relaxed">
                          <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Academic</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Education</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((ed, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-grad rounded-2xl p-7 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4 text-2xl">🎓</div>
                  <h3 className="font-display font-bold text-white text-lg leading-snug">{ed.degree}</h3>
                  <p className="text-violet-300 text-sm font-body mt-1">{ed.school}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-body">{ed.period}</span>
                    <span className="text-sm font-display font-bold text-emerald-400">{ed.grade}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Credentials</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Certifications</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="border-grad rounded-3xl p-8 card-hover">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center text-3xl">🏦</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-white text-xl">JPMorganChase Software Engineering Job Simulation</h3>
                    <span className="text-xs font-body bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full">Forage · Apr 2026</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {[
                      "Developed a Spring Boot microservice integrating Apache Kafka for high-volume transaction consumption and processing.",
                      "Implemented transaction validation and persistence using Spring Data JPA with relational database modeling.",
                      "Built RESTful endpoints and ensured system reliability through unit testing, debugging, and Maven test suites.",
                    ].map((pt, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-400 font-body leading-relaxed">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <span className="font-body text-violet-400 text-sm uppercase tracking-widest">Let's Connect</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-3 mb-4">Get in Touch</h2>
            <p className="font-body text-gray-400 mb-10 text-lg">Open to full-time roles and freelance projects. Let's build something great together.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: "📧", label: "Email", value: "bhaskarshukla440@gmail.com", href: "mailto:bhaskarshukla440@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 9455215962", href: "tel:9455215962" },
                { icon: "💼", label: "LinkedIn", value: "bhaskarshukla2112", href: "https://linkedin.com/in/bhaskarshukla2112" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="border-grad rounded-2xl p-5 card-hover flex flex-col items-center gap-2 group">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs text-gray-500 font-body uppercase tracking-wider">{c.label}</span>
                  <span className="text-sm text-gray-300 font-body group-hover:text-violet-400 transition-colors break-all text-center">{c.value}</span>
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="mailto:bhaskarshukla440@gmail.com"
              className="font-body inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-medium transition-all hover:shadow-xl hover:shadow-violet-500/25 text-base">
              Send a Message
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-gray-500">Bhaskar<span className="text-violet-400">.</span></span>
          <span className="font-body text-sm text-gray-600">© 2026 Bhaskar Shukla · Built with React & Tailwind CSS</span>
          <div className="flex gap-4">
            <a href="https://github.com/Bhaskar440" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-violet-400 transition-colors text-sm font-body">GitHub</a>
            <a href="https://linkedin.com/in/bhaskarshukla2112" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-violet-400 transition-colors text-sm font-body">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}