import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  techStack: string[];
  linkedin: string;
  portfolioUrl: string;
  avatar: string;
}

const dummyStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    techStack: ['React', 'Node.js', 'MongoDB'],
    linkedin: 'https://linkedin.com/in/rahul-sharma',
    portfolioUrl: '/portfolio/rahul-sharma',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  },
  {
    id: '2',
    name: 'Priya Patel',
    techStack: ['Python', 'Django', 'PostgreSQL'],
    linkedin: 'https://linkedin.com/in/priya-patel',
    portfolioUrl: '/portfolio/priya-patel',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNGI1NTYzIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  },
  {
    id: '3',
    name: 'Amit Kumar',
    techStack: ['JavaScript', 'Express', 'MySQL'],
    linkedin: 'https://linkedin.com/in/amit-kumar',
    portfolioUrl: '/portfolio/amit-kumar',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    techStack: ['React', 'TypeScript', 'Firebase'],
    linkedin: 'https://linkedin.com/in/sneha-gupta',
    portfolioUrl: '/portfolio/sneha-gupta',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNGI1NTYzIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  },
  {
    id: '5',
    name: 'Vikram Singh',
    techStack: ['Python', 'Machine Learning', 'TensorFlow'],
    linkedin: 'https://linkedin.com/in/vikram-singh',
    portfolioUrl: '/portfolio/vikram-singh',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  },
  {
    id: '6',
    name: 'Anjali Verma',
    techStack: ['Java', 'Spring Boot', 'MySQL'],
    linkedin: 'https://linkedin.com/in/anjali-verma',
    portfolioUrl: '/portfolio/anjali-verma',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='
  }
];

const Students: React.FC = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleComment = (id: string, comment: string) => {
    setComments(prev => ({ ...prev, [id]: comment }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-cyber-text page-content">
      <header className="mb-10 animate-item">
        <h1 className="text-3xl md:text-4xl font-extrabold">For Students</h1>
        <p className="mt-2 text-cyber-text/80 max-w-2xl">Build a standout portfolio with animated sections, verified certificates, and project showcases. Share a single link—impress recruiters with your work.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-item">
        {dummyStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{student.name}</h3>
                <p className="text-gray-400 text-sm">Student</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {student.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Linkedin size={16} className="text-blue-400" />
              <a
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                LinkedIn Profile
              </a>
            </div>

            <button
              onClick={() => navigate(student.portfolioUrl)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 mb-4"
            >
              View Portfolio <ExternalLink size={16} className="inline ml-1" />
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleLike(student.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors duration-300 ${
                  likes[student.id] ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Heart size={14} fill={likes[student.id] ? 'currentColor' : 'none'} />
                Like
              </button>
              <button
                onClick={() => {
                  const comment = prompt('Enter your comment:');
                  if (comment) handleComment(student.id, comment);
                }}
                className="flex items-center gap-1 px-3 py-1 rounded text-sm bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-300"
              >
                <MessageCircle size={14} />
                Comment
              </button>
            </div>

            {comments[student.id] && (
              <div className="mt-2 p-2 bg-white/5 rounded text-sm text-gray-300">
                <strong>Comment:</strong> {comments[student.id]}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <a href="/create" className="inline-block bg-cyber-primary text-cyber-bg px-5 py-3 rounded-lg font-semibold shadow">Create Your Free Portfolio →</a>
      </div>
    </div>
  );
};

export default Students;