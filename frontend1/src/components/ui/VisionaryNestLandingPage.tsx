import React from 'react';
import { motion } from 'framer-motion';

// Keyframe animations remain better in a style tag for complex animations
const KeyframeStyles = () => (
  <style>
    {`
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 20px 5px rgba(0, 119, 255, 0.2); }
        50% { box-shadow: 0 0 35px 12px rgba(0, 119, 255, 0.35); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes backgroundTextPan {
        from { transform: translateX(-15%); opacity: 0; }
        to { transform: translateX(0); opacity: 0.04; }
      }
    `}
  </style>
);

const VisionaryNestLandingPage: React.FC = () => {
  const featuredPortfolios = [
    { name: 'AI Chatbot', image: '/ai.jpg' },
    { name: 'E-commerce UI', image: '/E-commerce UI.jpg' },
    { name: 'Fitness App', image: '/Fitness App.jpg' },
    { name: 'Data Dashboard', image: '/Data Dashboard.jpg' },
  ];

  return (
    <>
      <KeyframeStyles />
      <div className="min-h-screen bg-[#0B1120] font-orbitron text-[#E0E0E0] overflow-x-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* Background Text */}
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 text-[22vw] font-black text-white/5 -z-10 select-none"
            style={{ animation: 'backgroundTextPan 1.5s ease-out forwards' }}
          >
            GRID
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Visual */}
            <motion.div 
              className="flex justify-center items-center order-2 lg:order-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div 
                className="w-full max-w-md h-auto bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg flex flex-col justify-center items-center text-center p-6 sm:p-10"
                style={{ animation: 'pulseGlow 5s infinite ease-in-out' }}
              >
                <motion.div 
                  className="mb-6"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                >
                  {/* Simplified SVG for performance */}
                  <svg width="150" height="150" viewBox="0 0 200 200" className="filter drop-shadow-lg">
                    <circle cx="100" cy="100" r="90" fill="rgba(0, 119, 255, 0.1)" stroke="rgba(0, 119, 255, 0.3)" strokeWidth="2" />
                    <circle cx="100" cy="80" r="35" fill="rgba(255, 255, 255, 0.9)" />
                    <circle cx="88" cy="75" r="3" fill="#0B1120" />
                    <circle cx="112" cy="75" r="3" fill="#0B1120" />
                    <path d="M 85 95 Q 100 110 115 95" stroke="#0B1120" fill="transparent" strokeWidth="2" />
                    <rect x="75" y="115" width="50" height="60" rx="25" fill="rgba(255, 255, 255, 0.9)" />
                  </svg>
                </motion.div>
                <p className="text-xl sm:text-2xl font-medium leading-snug text-white/90">
                  Showcase Your Skills. <br/> Land Your Dream Job.
                </p>
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Where Talent Meets Opportunity.
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed mb-8 font-sans">
                VisionaryNest is the ultimate platform for students to build, manage, and share dynamic skill portfolios. Turn your projects and certifications into career opportunities.
              </p>
              <motion.a 
                href="/create" 
                className="inline-flex items-center justify-center text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg px-8 py-4 text-lg font-semibold mb-12 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your Free Portfolio 
                <span className="ml-2">→</span>
              </motion.a>
              
              {/* Featured Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-md lg:max-w-none">
                {featuredPortfolios.map((portfolio, index) => (
                  <motion.div 
                    key={index} 
                    className="relative rounded-lg overflow-hidden h-24 sm:h-28 border border-white/10 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, zIndex: 10, boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}}
                  >
                    <img src={portfolio.image} alt={portfolio.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 sm:p-3">
                      <p className="text-white text-xs sm:text-sm font-medium w-full text-center">{portfolio.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VisionaryNestLandingPage;