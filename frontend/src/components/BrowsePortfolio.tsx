import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Mail, Phone, MapPin, Clock, Download, ArrowRight, ExternalLink, GraduationCap, Briefcase, Sparkles, Star, Code2, Layers, Search, ChevronRight } from "lucide-react";
import Typewriter from 'typewriter-effect';

export type Link = { label: string; href: string };
export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  thumbnail?: string;
  links?: Link[];
  collaborators?: string[];
  likes?: number;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  validTill?: string;
  fileUrl?: string;
  verified?: boolean;
  relatedSkills: string[];
};

export type Skill = {
  name: string;
  level: number;
};

export type Experience = {
  role: string;
  org: string;
  location?: string;
  start: string;
  end: string;
  bullets?: string[];
};

export type Education = {
  title: string;
  org: string;
  dateRange: string;
  bullets?: string[];
};

export type StudentData = {
  name: string;
  taglineLeft?: string;
  taglineHighlight?: string;
  taglineRight?: string;
  subTagline?: string;
  aboutShort?: string;
  yearsExperience?: number;
  projectsCount?: number;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  social?: {
    github?: string;
    website?: string;
    linkedin?: string;
  };
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
  tools: string[];
  experiences: Experience[];
  education: Education[];
};




const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block">
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-blue-200/90 drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]">
      {children}
    </h2>
    <div className="h-1 w-16 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full mt-2" />
  </div>
);

const GradientCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${className ?? ""}`}
  >
    
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-t-2xl" />
    {children}
  </motion.div>
);

const Stat: React.FC<{ label: string; value: string | number; href?: string }> = ({ label, value, href }) => (
  <a
    href={href ?? "#"}
    className="group flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-900/10 px-4 py-2 text-sky-200 hover:border-sky-300/40 hover:bg-sky-900/20 transition"
  >
    <Sparkles className="size-4 opacity-80 group-hover:rotate-6 transition" />
    <div>
      <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
    <ChevronRight className="size-4 ml-auto opacity-60 group-hover:translate-x-0.5 transition" />
  </a>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full h-2 rounded-full bg-blue-900/40 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.35)]"
    />
  </div>
);


export default function PortfolioPage({ data }: { data?: StudentData }) {
  // State for browse functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [componentError, setComponentError] = useState<string | null>(null);

  // Function to generate catchy phrases from skills
  const generateCatchyPhrases = (skills: Skill[]): string[] => {
    if (!skills || skills.length === 0) {
      return ['Developer', 'Designer', 'Creator'];
    }

    const phrases: string[] = [];
    const skillNames = skills.map(skill => skill.name);

    // Create different types of phrases
    const adjectives = ['Passionate', 'Aspiring', 'Experienced', 'Skilled', 'Talented', 'Innovative'];
    const roles = ['Developer', 'Engineer', 'Designer', 'Specialist', 'Expert', 'Professional'];

    // Generate phrases based on skills
    skillNames.forEach(skill => {
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      phrases.push(`${randomAdjective} ${skill} ${randomRole}`);
    });

    // Add some combined skill phrases
    if (skillNames.length >= 2) {
      const skill1 = skillNames[0];
      const skill2 = skillNames[1];
      phrases.push(`${skill1} & ${skill2} Enthusiast`);
      phrases.push(`Full-Stack ${skill1} Developer`);
    }

    // Add some general phrases
    phrases.push('Problem Solver');
    phrases.push('Code Craftsman');
    phrases.push('Tech Innovator');

    // Remove duplicates and limit to 6 phrases
    return [...new Set(phrases)].slice(0, 6);
  };

  // Demo data for fallback
  const demoData: StudentData = {
    name: "Demo User",
    taglineLeft: "Hey, I am",
    taglineHighlight: "Demo",
    taglineRight: "Developer",
    subTagline: "Building your dream pixel by pixel!",
    aboutShort: "Passionate developer with experience in web technologies.",
    yearsExperience: 2,
    projectsCount: 5,
    email: "demo@example.com",
    phone: "+1234567890",
    location: "Demo City",
    avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDQwMCAyODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjg4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTU0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRlbW8gVXNlcjwvdGV4dD4KPHN2Zz4=',
    resumeUrl: "",
    social: {
      github: "https://github.com/demo",
      website: "https://demo.dev",
      linkedin: ""
    },
    projects: [],
    certificates: [],
    skills: [{ name: "JavaScript", level: 80 }, { name: "React", level: 75 }],
    tools: ["VS Code", "Git"],
    experiences: [],
    education: []
  };

  const displayData: StudentData = data ?? demoData;

  // Functions for browse functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search logic here
  };

  const handleSkillToggle = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock data instead of API call to prevent fetch errors
      const mockPortfolios = [
        {
          _id: '1',
          user: {
            fullname: 'John Doe',
            username: 'johndoe',
            userType: 'Developer',
            avatar: { public_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=' }
          },
          avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=',
          aboutShort: 'Full-stack developer with 3 years of experience',
          taglineLeft: 'Passionate developer',
          skills: [
            { name: 'React' },
            { name: 'Node.js' },
            { name: 'TypeScript' }
          ]
        },
        {
          _id: '2',
          user: {
            fullname: 'Jane Smith',
            username: 'janesmith',
            userType: 'Designer',
            avatar: { public_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=' }
          },
          avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=',
          aboutShort: 'UI/UX designer specializing in web applications',
          taglineLeft: 'Creative designer',
          skills: [
            { name: 'Figma' },
            { name: 'Adobe XD' },
            { name: 'Sketch' }
          ]
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPortfolios(mockPortfolios);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      setError('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    // Implement load more logic
    fetchPortfolios();
  };

  // Fetch portfolios on mount
  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Handle component errors
  if (componentError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{componentError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (data) {
    // Individual portfolio view - use existing template
    return (
      <div className="min-h-screen text-sky-100 selection:bg-sky-500/40">
        {/* ... existing individual portfolio template ... */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800;900&family=Fira+Code:wght@400;600&display=swap');
          :root { --grid-color: rgba(56, 189, 248, 0.15); }
          body { margin: 0; }
          .algerianish { font-family: 'Orbitron', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Fira Code', monospace; }
          .techy { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Sans Serif'; }
          .codey { font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
          .grid-bg {
            position: relative;
            background: radial-gradient(1200px 600px at 50% -10%, rgba(29,78,216,0.5), transparent 60%), #060b1a;
          }
          .grid-bg::before {
            content: '';
            position: absolute; inset: 0; pointer-events: none; opacity: .7;
            background-image:
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 60px 60px; background-position: center top;
            transform: perspective(500px) rotateX(60deg); transform-origin: center top;
          }
          @keyframes floaty { 0% { transform: translateY(0);} 50% { transform: translateY(-6px);} 100% { transform: translateY(0);} }
          @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 0px rgba(56,189,248,0.0);} 50% { box-shadow: 0 0 24px rgba(56,189,248,0.35);} }
          .glow { animation: glow-pulse 2.2s ease-in-out infinite; }
          .type-caret { position: relative; }
          .type-caret::after { content: '|'; margin-left: 6px; color: #7dd3fc; animation: blink 1s step-start infinite; }
          @keyframes blink { 50% { opacity: 0; } }
        `}</style>

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-blue-950/40 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
            <div className="algerianish text-lg font-black tracking-widest text-sky-300 drop-shadow-[0_0_10px_rgba(125,211,252,0.25)]">
              VISIONARYNEST
            </div>
            <nav className="ml-auto hidden md:flex items-center gap-6 text-sky-200/80">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#journey" className="hover:text-white">Journey</a>
              <a href="#skills" className="hover:text-white">Skills</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid-bg relative">
          <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="techy text-sky-300/90">{displayData.taglineLeft ?? "Hey, I am"}</p>
              <h1 className="algerianish text-4xl md:text-6xl font-black leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-indigo-400 bg-clip-text text-transparent type-caret">
                  <Typewriter
                    options={{
                      strings: generateCatchyPhrases(displayData.skills || []),
                      autoStart: true,
                      loop: true,
                      delay: 80,
                      deleteSpeed: 50,
                    }}
                    onInit={(typewriter) => {
                      // Handle any initialization errors
                      try {
                        typewriter.typeString('').start();
                      } catch (error) {
                        console.warn('Typewriter initialization error:', error);
                      }
                    }}
                  />
                </span>
              </h1>
              <p className="techy mt-4 text-2xl md:text-3xl font-semibold text-sky-200">
                {displayData.subTagline ?? "Building your dream pixel by pixel!"}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow-lg hover:from-sky-400 hover:to-indigo-500 transition">
                  View Projects <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
                </a>
                {displayData.resumeUrl && (
                  <a href={displayData.resumeUrl} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sky-200 hover:bg-white/10 transition">
                    <Download className="size-4" /> Download CV
                  </a>
                )}
              </div>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 sm:flex gap-3 max-w-3xl">
              <Stat label="Experience" value={`${displayData.yearsExperience ?? 0} years`} />
              <Stat label="Projects" value={`~${displayData.projectsCount ?? 0}`} />
              {displayData.social?.github && <Stat label="GitHub" value="Profile" href={displayData.social.github} />}
              {displayData.social?.website && <Stat label="Portfolio" value="Website" href={displayData.social.website} />}
            </div>
          </div>
        </section>

        {/* Rest of the existing template... */}
        {/* About section */}
        <section id="about" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>Why hire me for your <span className="text-sky-300">next project?</span></SectionTitle></div>
            <div className="grid md:grid-cols-[320px_1fr] gap-6 items-start">
              <GradientCard className="overflow-hidden">
                <div className="relative">
                  <img
                    src={displayData.avatarUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDQwMCAyODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE0NCIgcj0iMTQ0IiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgNzIgNzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMTY0IiB5PSI5NiI+CjxwYXRoIGQ9Ik0zNiAzNmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiIGZpbGw9IiNmM2Y0ZjYiLz4KPHN2Zz4KPHN2Zz4K'}
                    alt="avatar"
                    className="h-72 w-full object-cover rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDQwMCAyODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjg4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTU0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-blue-950/60 backdrop-blur-md p-3 flex items-center gap-3 border border-white/10">
                    <Clock className="size-4 text-sky-300" />
                    <p className="text-sm text-sky-100/90">More than {(displayData.yearsExperience ?? 0)} years building polished interfaces.</p>
                  </div>
                </div>
              </GradientCard>
              <GradientCard>
                <p className="text-sky-100/90 leading-relaxed">
                  {displayData.aboutShort}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {displayData.email && (
                    <a href={`mailto:${displayData.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2"><Mail className="size-4" /> {displayData.email}</a>
                  )}
                  {displayData.phone && (
                    <a href={`tel:${displayData.phone}`} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2"><Phone className="size-4" /> {displayData.phone}</a>
                  )}
                  {displayData.location && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2"><MapPin className="size-4" /> {displayData.location}</span>
                  )}
                </div>
              </GradientCard>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section id="skills" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>My <span className="text-sky-300">Technical Skills</span></SectionTitle></div>
            <div className="grid md:grid-cols-2 gap-6">
              <GradientCard>
                <h3 className="text-xl font-semibold text-sky-200 mb-6">Core Skills</h3>
                <div className="space-y-4">
                  {displayData.skills?.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-sky-200">{skill.name}</span>
                        <span className="text-sky-400">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} />
                    </div>
                  ))}
                </div>
              </GradientCard>
              <GradientCard>
                <h3 className="text-xl font-semibold text-sky-200 mb-6">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {displayData.tools?.map((tool, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-sm border border-sky-500/30">
                      {tool}
                    </span>
                  ))}
                </div>
              </GradientCard>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>Featured <span className="text-sky-300">Projects</span></SectionTitle></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayData.projects?.map((project, index) => (
                <GradientCard key={index} className="group hover:scale-105 transition">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={project.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-sky-200 mb-2">{project.title}</h3>
                  <p className="text-sky-100/70 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 rounded text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.links?.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition text-sm"
                      >
                        <ExternalLink className="size-4" /> {link.label}
                      </a>
                    ))}
                  </div>
                </GradientCard>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates section */}
        <section id="certificates" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>My <span className="text-sky-300">Certificates</span></SectionTitle></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayData.certificates?.map((cert, index) => (
                <GradientCard key={index} className="group cursor-pointer hover:scale-105 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-sky-200 mb-1">{cert.name}</h3>
                      <p className="text-sky-400 text-sm">{cert.issuer}</p>
                    </div>
                    {cert.verified && (
                      <div className="flex items-center gap-1 text-green-400">
                        <Star className="size-4" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sky-100/70 text-sm mb-4">Issued: {cert.date}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.relatedSkills?.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 rounded text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {cert.fileUrl && (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition text-sm"
                    >
                      <ExternalLink className="size-4" /> View Certificate
                    </a>
                  )}
                </GradientCard>
              ))}
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section id="experience" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>My <span className="text-sky-300">Experience</span></SectionTitle></div>
            <div className="space-y-6">
              {displayData.experiences?.map((exp, index) => (
                <GradientCard key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-sky-200">{exp.role}</h3>
                      <p className="text-sky-400">{exp.org}</p>
                      {exp.location && <p className="text-sky-100/60 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-sky-300 font-medium">{exp.start} - {exp.end}</p>
                    </div>
                  </div>
                  {exp.bullets && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-sky-100/80 text-sm flex items-start gap-2">
                          <span className="text-sky-400 mt-1">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </GradientCard>
              ))}
            </div>
          </div>
        </section>

        {/* Education section */}
        <section id="education" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8"><SectionTitle>My <span className="text-sky-300">Education</span></SectionTitle></div>
            <div className="space-y-6">
              {displayData.education?.map((edu, index) => (
                <GradientCard key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-sky-200">{edu.title}</h3>
                      <p className="text-sky-400">{edu.org}</p>
                    </div>
                    <div className="text-sky-300 font-medium mt-2 md:mt-0">
                      {edu.dateRange}
                    </div>
                  </div>
                  {edu.bullets && (
                    <ul className="space-y-2">
                      {edu.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-sky-100/80 text-sm flex items-start gap-2">
                          <span className="text-sky-400 mt-1">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </GradientCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="relative">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="text-center">
              <SectionTitle>Let's <span className="text-sky-300">Connect</span></SectionTitle>
              <p className="text-sky-100/80 mb-8 max-w-2xl mx-auto">
                I'm always interested in new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {displayData.social?.github && (
                  <a href={displayData.social.github} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 hover:bg-white/20 transition">
                    <Github className="size-5" /> GitHub
                  </a>
                )}
                {displayData.social?.linkedin && (
                  <a href={displayData.social.linkedin} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 hover:bg-white/20 transition">
                    <ExternalLink className="size-5" /> LinkedIn
                  </a>
                )}
                {displayData.social?.website && (
                  <a href={displayData.social.website} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 hover:bg-white/20 transition">
                    <Globe className="size-5" /> Website
                  </a>
                )}
                {displayData.email && (
                  <a href={`mailto:${displayData.email}`}
                     className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-sky-400 hover:to-indigo-500 transition">
                    <Mail className="size-5" /> Email Me
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Browse view - show all portfolios
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Search and Filter Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'UI/UX'].map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    skills.includes(skill)
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolios Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && portfolios.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => fetchPortfolios()}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {portfolios.map((portfolio: any) => (
                <motion.div
                  key={portfolio._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={portfolio.avatarUrl || portfolio.user?.avatar?.public_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='}
                      alt={portfolio.user?.fullname || 'User'}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHRleHQgeD0iMjQiIHk9IjI4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk88L3RleHQ+Cjwvc3ZnPg==';
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-white">{portfolio.user?.fullname || 'Unknown User'}</h3>
                      <p className="text-gray-400 text-sm">{portfolio.user?.userType || 'User'}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {portfolio.aboutShort || portfolio.taglineLeft}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.skills?.slice(0, 3).map((skill: any) => (
                      <span key={skill.name} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/portfolio/${portfolio.user?.username}`}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    View Portfolio <ExternalLink size={16} />
                  </a>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
