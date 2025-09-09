import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Building, Heart } from 'lucide-react';

interface Recruiter {
  id: string;
  name: string;
  company: string;
  position: string;
  linkedin: string;
  avatar: string;
  likedPost: boolean;
  comment?: string;
}

const dummyRecruiters: Recruiter[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    company: 'TCS (Tata Consultancy Services)',
    position: 'Senior Software Engineer',
    linkedin: 'https://linkedin.com/in/arjun-mehta',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: true,
    comment: 'Great portfolio! Interested in your React skills.'
  },
  {
    id: '2',
    name: 'Kavita Rao',
    company: 'Infosys',
    position: 'Tech Lead',
    linkedin: 'https://linkedin.com/in/kavita-rao',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNGI1NTYzIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: true,
    comment: 'Impressive Python projects. Let\'s connect!'
  },
  {
    id: '3',
    name: 'Rohit Jain',
    company: 'Wipro',
    position: 'Project Manager',
    linkedin: 'https://linkedin.com/in/rohit-jain',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: false
  },
  {
    id: '4',
    name: 'Meera Iyer',
    company: 'Accenture',
    position: 'HR Manager',
    linkedin: 'https://linkedin.com/in/meera-iyer',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNGI1NTYzIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: true,
    comment: 'Your portfolio stands out. Would love to discuss opportunities.'
  },
  {
    id: '5',
    name: 'Suresh Reddy',
    company: 'HCL Technologies',
    position: 'Senior Developer',
    linkedin: 'https://linkedin.com/in/suresh-reddy',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS7OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: true
  },
  {
    id: '6',
    name: 'Poonam Singh',
    company: 'Capgemini',
    position: 'Technical Architect',
    linkedin: 'https://linkedin.com/in/poonam-singh',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNGI1NTYzIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS7OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
    likedPost: false,
    comment: 'Excellent work on machine learning projects!'
  }
];

const Recruiters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-cyber-text page-content">
      <header className="mb-10 animate-item">
        <h1 className="text-3xl md:text-4xl font-extrabold">For Recruiters</h1>
        <p className="mt-2 text-cyber-text/80 max-w-2xl">Discover student talent with clean portfolio overviews, skills, certifications, and project highlights—no sign-in required for browsing.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-item">
        {dummyRecruiters.map((recruiter, index) => (
          <motion.div
            key={recruiter.id}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={recruiter.avatar}
                alt={recruiter.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{recruiter.name}</h3>
                <p className="text-gray-400 text-sm">{recruiter.position}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Building size={16} className="text-green-400" />
              <span className="text-green-400 text-sm">{recruiter.company}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Linkedin size={16} className="text-blue-400" />
              <a
                href={recruiter.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                LinkedIn Profile
              </a>
            </div>

            {recruiter.likedPost && (
              <div className="flex items-center gap-2 mb-4">
                <Heart size={16} className="text-red-400" fill="currentColor" />
                <span className="text-red-400 text-sm font-medium">Liked your profile</span>
              </div>
            )}

            {recruiter.comment && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-gray-300 text-sm italic">"{recruiter.comment}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <a href="/browse" className="inline-block bg-white/10 px-5 py-3 rounded-lg font-semibold border border-white/15">Browse Portfolios →</a>
      </div>
    </div>
  );
};

export default Recruiters;