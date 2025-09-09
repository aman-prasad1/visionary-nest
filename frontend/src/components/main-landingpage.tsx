import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLenis } from "../contexts/LenisContext";

const CyberpunkLanding = () => {
  const navigate = useNavigate();
  const { setIsLenisEnabled } = useLenis();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable Lenis smooth scrolling for this page
    setIsLenisEnabled(false);

    // Redirect after 7 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('/visionary-nest');
    }, 7000);

    // Mouse move listener
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation on load
    setTimeout(() => setIsLoaded(true), 500);

    // Cleanup listeners and timeout
    return () => {
      clearTimeout(redirectTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      // Re-enable Lenis when leaving the page
      setIsLenisEnabled(true);
    };
  }, [navigate, setIsLenisEnabled]);

  const glitchText = (text: string, delay: number = 0) => {
    return (
      <span
        className="relative inline-block"
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
        <span className="absolute inset-0 animate-pulse opacity-30 text-cyan-400">
          {text}
        </span>
        <span
          className="absolute inset-0 animate-ping opacity-20 text-blue-500"
          style={{ animationDelay: "0.5s" }}
        >
          {text}
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-mono overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1 animate-scan"></div>

      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
        </div>
      ))}

      <div className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-glitch-bar"></div>
      <div
        className="absolute bottom-32 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-glitch-bar"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <div className="text-sm tracking-widest text-cyan-400 uppercase animate-pulse">
                {glitchText("// System Initialized")}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <div className="mb-2">{glitchText("CYBER", 0.2)}</div>
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {glitchText("PORTFOLIO", 0.4)}
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl text-gray-300">
                  {glitchText("v2.077", 0.6)}
                </div>
              </h1>
            </div>

            <div className="space-y-6 max-w-lg">
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-lg text-gray-300 leading-relaxed">
                  <span className="text-cyan-400 font-bold">Mission:</span>{" "}
                  Navigate the digital frontier where
                  <span className="text-blue-400"> cutting-edge technology</span>{" "}
                  converges with
                  <span className="text-purple-400"> innovative design</span>.
                </p>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <p className="text-lg text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-bold">Objective:</span>{" "}
                  Showcase advanced
                  <span className="text-cyan-400"> AI-driven solutions</span>,
                  <span className="text-purple-400"> neural interfaces</span>,
                  and
                  <span className="text-green-400"> quantum algorithms</span>{" "}
                  that push the boundaries of possibility.
                </p>
              </div>
              <div className="border-l-2 border-purple-400 pl-4">
                <p className="text-lg text-gray-300 leading-relaxed">
                  <span className="text-purple-400 font-bold">Vision:</span>{" "}
                  Building tomorrow's digital ecosystem today - where{" "}
                  <span className="text-cyan-400">human creativity</span> meets
                  <span className="text-blue-400">machine intelligence</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-sm font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/50">
                <span className="flex items-center">
                  ACCESS_SYSTEM
                  <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">&gt;&gt;</span>
                </span>
              </button>
              <button className="group border-2 border-purple-500 px-8 py-4 rounded-sm font-bold text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center">
                  NEURAL_LINK
                  <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">◊◊</span>
                </span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center border border-cyan-400/30 p-4 rounded bg-cyan-400/5">
                <div className="text-2xl font-bold text-cyan-400 animate-pulse">99.7%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Uptime</div>
              </div>
              <div className="text-center border border-blue-400/30 p-4 rounded bg-blue-400/5">
                <div className="text-2xl font-bold text-blue-400 animate-pulse">2077</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center border border-purple-400/30 p-4 rounded bg-purple-400/5">
                <div className="text-2xl font-bold text-purple-400 animate-pulse">∞</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Possibilities</div>
              </div>
            </div>
          </div>

          <div
            className={`relative flex justify-center items-center transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div
              ref={imageRef}
              className="relative transition-transform duration-150 ease-out will-change-transform"
              style={{
                transform: `translate3d(${mousePosition.x}px, ${
                  mousePosition.y
                }px, 0) rotateY(${mousePosition.x * 0.3}deg) rotateX(${
                  -mousePosition.y * 0.2
                }deg)`,
              }}
            >
              <div className="relative">
                <img
                  src="/Gemini_Generated_Image_gpou9ygpou9ygpou.png"
                  alt="Cyberpunk Robot Avatar"
                  className="w-96 h-96 object-cover rounded-lg shadow-2xl shadow-cyan-500/30 border border-cyan-400/20"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                        <defs>
                          <radialGradient id="robotGrad" cx="50%" cy="30%">
                            <stop offset="0%" stop-color="#0891b2"/>
                            <stop offset="50%" stop-color="#1e293b"/>
                            <stop offset="100%" stop-color="#020617"/>
                          </radialGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3"/>
                            <feMerge>
                              <feMergeNode in="blur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <path d="M200 50 C260 50, 310 100, 310 160 C310 200, 290 235, 260 250 L260 270 C260 280, 250 290, 240 290 L160 290 C150 290, 140 280, 140 270 L140 250 C110 235, 90 200, 90 160 C90 100, 140 50, 200 50 Z" fill="url(#robotGrad)" filter="url(#glow)"/>
                        <path d="M200 80 C240 80, 280 110, 280 160 C280 185, 270 205, 250 215 L150 215 C130 205, 120 185, 120 160 C120 110, 160 80, 200 80 Z" fill="#000" opacity="0.9"/>
                        <circle cx="170" cy="150" r="10" fill="#fbbf24" filter="url(#glow)">
                          <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="230" cy="150" r="10" fill="#fbbf24" filter="url(#glow)">
                          <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <rect x="140" y="290" width="120" height="150" rx="20" fill="url(#robotGrad)" filter="url(#glow)"/>
                        <rect x="160" y="320" width="80" height="80" rx="10" fill="#0891b2" opacity="0.8"/>
                        <circle cx="200" cy="360" r="15" fill="#06b6d4" filter="url(#glow)">
                          <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <rect x="170" y="330" width="20" height="2" fill="#06b6d4" opacity="0.8"/>
                        <rect x="210" y="330" width="20" height="2" fill="#06b6d4" opacity="0.8"/>
                        <rect x="170" y="380" width="15" height="2" fill="#06b6d4" opacity="0.6"/>
                        <rect x="215" y="380" width="15" height="2" fill="#06b6d4" opacity="0.6"/>
                      </svg>
                    `)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-lg animate-pulse"></div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-orbit opacity-60"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: `${60 + i * 10}px`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${8 + i}s`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 border border-cyan-400/20 rounded-full animate-spin-slow"></div>
                <div className="absolute w-96 h-96 border border-blue-400/10 rounded-full animate-reverse-spin"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-vertical"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-cyan-400 font-mono opacity-60">
        <div>&gt; neural_interface_active.exe</div>
        <div>&gt; quantum_processor_online</div>
        <div>&gt; reality.matrix.loaded</div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-blue-400 font-mono opacity-60">
        <div>SYS_STATUS: [OPERATIONAL]</div>
        <div>AI_CORE: [ACTIVE]</div>
        <div>NEURAL_LINK: [SYNCHRONIZED]</div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes scan-vertical {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glitch-bar {
          0%, 100% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-scan-vertical {
          animation: scan-vertical 2s linear infinite;
        }
        .animate-glitch-bar {
          animation: glitch-bar 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CyberpunkLanding;
