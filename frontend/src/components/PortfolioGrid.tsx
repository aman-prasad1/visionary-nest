import React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';
import { motion } from 'framer-motion';

interface PortfolioGridProps {
  projects: Project[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
};

export default PortfolioGrid;
