import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export const usePageTransition = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      // GSAP timeline for complex animations
      const tl = gsap.timeline();

      // Check if page-content elements exist before animating
      const pageContent = document.querySelectorAll('.page-content');
      if (pageContent.length > 0) {
        tl.fromTo(
          '.page-content',
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          }
        );
      }

      // Check if animate-item elements exist before animating
      const animateItems = document.querySelectorAll('.animate-item');
      if (animateItems.length > 0) {
        tl.fromTo(
          '.animate-item',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.4"
        );
      }

      // Fallback: animate the main app container if specific classes don't exist
      if (pageContent.length === 0 && animateItems.length === 0) {
        const mainContainer = document.querySelector('main') || document.querySelector('#root > div');
        if (mainContainer) {
          tl.fromTo(
            mainContainer,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }
          );
        }
      }

      // Store timeline for cleanup
      return () => {
        tl.kill();
      };
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);
};