import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface FormAnimation3DProps {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

const FormAnimation3D: React.FC<FormAnimation3DProps> = ({ step, totalSteps, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 3D animation effect when changing steps
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      // Reset any previous transforms
      gsap.set(contentRef.current, { 
        rotationY: 0, 
        z: 0,
        opacity: 0,
        scale: 0.9
      });
      
      // Animate in with 3D effect
      gsap.to(contentRef.current, {
        rotationY: 0,
        z: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      });
      
      // Particle effect
      if (containerRef.current) {
        const container = containerRef.current;
        const createParticle = () => {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 rounded-full bg-purple-500 opacity-0';
          
          // Random position around the form
          const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
          let x, y;
          
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          
          switch(side) {
            case 0: // top
              x = Math.random() * width;
              y = -10;
              break;
            case 1: // right
              x = width + 10;
              y = Math.random() * height;
              break;
            case 2: // bottom
              x = Math.random() * width;
              y = height + 10;
              break;
            case 3: // left
              x = -10;
              y = Math.random() * height;
              break;
            default:
              x = Math.random() * width;
              y = Math.random() * height;
          }
          
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          
          container.appendChild(particle);
          
          // Animate the particle
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0.8,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(particle, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  if (particle.parentNode === container) {
                    container.removeChild(particle);
                  }
                }
              });
            }
          });
        };
        
        // Create multiple particles
        for (let i = 0; i < 15; i++) {
          setTimeout(createParticle, i * 50);
        }
      }
    }
    
    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${(step / totalSteps) * 100}%`,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)"
      });
    }
  }, [step, totalSteps]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            ref={progressRef}
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
            initial={{ width: 0 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`relative flex items-center justify-center w-6 h-6 rounded-full ${
                i < step ? 'bg-purple-600 text-white' : 
                i === step ? 'bg-purple-500 text-white ring-2 ring-purple-300 ring-opacity-50' : 
                'bg-gray-700 text-gray-400'
              }`}
            >
              {i + 1}
              {i < totalSteps - 1 && (
                <div className={`absolute left-6 w-[calc(100%-1.5rem)] h-0.5 ${
                  i < step - 1 ? 'bg-purple-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 3D Content Container */}
      <div 
        ref={contentRef}
        className="transform-gpu perspective-1000"
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FormAnimation3D;