import React, { useEffect, useRef } from 'react';
import paper from 'paper';

const PaperCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup Paper.js
    paper.setup(canvasRef.current);

    // Create animated background elements
    const backgroundCircle = new paper.Path.Circle(paper.view.center, 100);
    backgroundCircle.fillColor = new paper.Color(0.1, 0.1, 0.3, 0.1);

    // Create floating particles
    const particles: paper.Path.Circle[] = [];
    for (let i = 0; i < 20; i++) {
      const particle = new paper.Path.Circle(
        new paper.Point(
          Math.random() * paper.view.size.width,
          Math.random() * paper.view.size.height
        ),
        Math.random() * 3 + 1
      );
      particle.fillColor = new paper.Color(
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random(),
        0.6
      );
      particles.push(particle);
    }

    // Animation loop
    paper.view.onFrame = (event: any) => {
      // Animate background circle
      backgroundCircle.scale(1 + Math.sin(event.time * 0.5) * 0.1);

      // Animate particles
      particles.forEach((particle, index) => {
        particle.position.y += Math.sin(event.time + index) * 0.5;
        particle.position.x += Math.cos(event.time + index) * 0.3;

        // Wrap around screen
        if (particle.position.x > paper.view.size.width) {
          particle.position.x = 0;
        }
        if (particle.position.x < 0) {
          particle.position.x = paper.view.size.width;
        }
        if (particle.position.y > paper.view.size.height) {
          particle.position.y = 0;
        }
        if (particle.position.y < 0) {
          particle.position.y = paper.view.size.height;
        }
      });
    };

    return () => {
      paper.project.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  );
};

export default PaperCanvas;
