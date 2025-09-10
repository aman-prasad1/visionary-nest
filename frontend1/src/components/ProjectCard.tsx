import { motion } from 'framer-motion';
import { Card, Tag, Tooltip } from 'antd';
import { GithubOutlined, ExportOutlined } from '@ant-design/icons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Card
        hoverable
        cover={<img src={project.thumbnail} alt={project.title} className="h-48 w-full object-cover" />}
        className="rounded-xl overflow-hidden shadow-md"
      >
        <Card.Meta title={<span className="font-semibold">{project.title}</span>} description={<span className="text-gray-600">{project.description}</span>} />

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t} color="purple" className="!m-0">{t}</Tag>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 justify-end">
          <Tooltip title="GitHub">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              <GithubOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Live Demo">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              <ExportOutlined />
            </a>
          </Tooltip>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
