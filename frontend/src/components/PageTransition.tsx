import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation on page change
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [location.pathname]);

  // Enhanced page variants with more complex animations
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 15
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0
    },
    out: {
      opacity: 0,
      y: -50,
      scale: 1.1,
      rotateX: -15
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic bezier
    duration: 0.6
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={containerRef}
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;