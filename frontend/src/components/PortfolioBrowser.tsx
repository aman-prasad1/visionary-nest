import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api';
import { setPortfolios, setLoading, setError } from '../store/slices/portfoliosSlice';
import { setSearchTerm, toggleSkill } from '../store/slices/filtersSlice';

const PortfolioBrowser: React.FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: portfolios, loading, error } = useSelector((state: any) => state.portfolios);
  const { searchTerm, skills } = useSelector((state: any) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch portfolios on component mount and when filters change
  useEffect(() => {
    fetchPortfolios();
  }, [searchTerm, skills, currentPage]);

  const fetchPortfolios = async () => {
    dispatch(setLoading(true));
    try {
      const params: any = {
        page: currentPage,
        limit: 12,
      };

      if (searchTerm) params.search = searchTerm;
      if (skills && skills.length > 0) params.skills = skills.join(',');

      const response = await apiClient.browsePortfolios(params);

      if (response.success) {
        const { portfolios: newPortfolios, totalPages } = response.data;
        if (currentPage === 1) {
          dispatch(setPortfolios(newPortfolios));
        } else {
          // Append to existing portfolios for pagination
          dispatch(setPortfolios([...portfolios, ...newPortfolios]));
        }
        setHasMore(currentPage < totalPages);
      } else {
        // Fallback to mock data when API fails
        const mockPortfolios = [
          {
            _id: 'mock-john-doe',
            name: 'John Doe',
            taglineLeft: 'Passionate developer',
            aboutShort: 'Full-stack developer with 3 years of experience',
            avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjOWNhM2FmIi8+Cjwvc3ZnPgo8L3N2Zz4=',
            projects: [],
            certificates: [],
            skills: [
              { name: 'React', level: 80 },
              { name: 'Node.js', level: 75 },
              { name: 'TypeScript', level: 70 }
            ],
            tools: ['VS Code', 'Git'],
            experiences: [],
            education: []
          },
          {
            _id: 'mock-jane-smith',
            name: 'Jane Smith',
            taglineLeft: 'Creative designer',
            aboutShort: 'UI/UX designer specializing in web applications',
            avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM0YjU1NjMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZDFkNWRiIi8+Cjwvc3ZnPgo8L3N2Zz4=',
            projects: [],
            certificates: [],
            skills: [
              { name: 'Figma', level: 85 },
              { name: 'Adobe XD', level: 80 },
              { name: 'Sketch', level: 75 }
            ],
            tools: ['Figma', 'Adobe XD', 'Sketch'],
            experiences: [],
            education: []
          },
          {
            _id: 'mock-mike-johnson',
            name: 'Mike Johnson',
            taglineLeft: 'Data enthusiast',
            aboutShort: 'Data scientist with expertise in machine learning',
            avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4=',
            projects: [],
            certificates: [],
            skills: [
              { name: 'Python', level: 90 },
              { name: 'TensorFlow', level: 85 },
              { name: 'SQL', level: 80 }
            ],
            tools: ['Jupyter', 'Python', 'TensorFlow'],
            experiences: [],
            education: []
          }
        ];
        
        dispatch(setPortfolios(mockPortfolios));
        setHasMore(false);
        console.warn('Using mock data due to API failure:', response.error);
      }
    } catch (err) {
      // Fallback to mock data when API fails
      const mockPortfolios = [
        {
          _id: 'mock-john-doe-err',
          name: 'John Doe',
          taglineLeft: 'Passionate developer',
          aboutShort: 'Full-stack developer with 3 years of experience',
          avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjOWNhM2FmIi8+Cjwvc3ZnPgo8L3N2Zz4=',
          projects: [],
          certificates: [],
          skills: [
            { name: 'React', level: 80 },
            { name: 'Node.js', level: 75 },
            { name: 'TypeScript', level: 70 }
          ],
          tools: ['VS Code', 'Git'],
          experiences: [],
          education: []
        },
        {
          _id: 'mock-jane-smith-err',
          name: 'Jane Smith',
          taglineLeft: 'Creative designer',
          aboutShort: 'UI/UX designer specializing in web applications',
          avatarUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM0YjU1NjMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZDFkNWRiIi8+Cjwvc3ZnPgo8L3N2Zz4=',
          projects: [],
          certificates: [],
          skills: [
            { name: 'Figma', level: 85 },
            { name: 'Adobe XD', level: 80 },
            { name: 'Sketch', level: 75 }
          ],
          tools: ['Figma', 'Adobe XD', 'Sketch'],
          experiences: [],
          education: []
        }
      ];
      
      dispatch(setPortfolios(mockPortfolios));
      setHasMore(false);
      console.warn('Using mock data due to API error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSkillToggle = (skill: string) => {
    dispatch(toggleSkill(skill));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Search and Filter Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'UI/UX'].map((skill, index) => (
                <motion.button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 ${
                    (skills || []).includes(skill)
                      ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:border-purple-400/50'
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolios Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (!portfolios || portfolios.length === 0) ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => fetchPortfolios()}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {(portfolios || []).map((portfolio: any, index: number) => (
                <motion.div
                  key={portfolio._id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)',
                    borderColor: 'rgba(139, 92, 246, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/portfolio/${portfolio.user?.username}`)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={portfolio.avatarUrl || portfolio.user?.avatar?.public_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2YjcyODAiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS7OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='}
                      alt={portfolio.user?.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{portfolio.user?.fullname}</h3>
                      <p className="text-gray-400 text-sm">{portfolio.user?.userType}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {portfolio.aboutShort || portfolio.taglineLeft || 'No description available'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.skills?.slice(0, 3).map((skill: any) => (
                      <span key={skill.name} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 text-sm font-medium transition-colors duration-300">
                    View Portfolio <ExternalLink size={16} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="text-center">
                <motion.button
                  onClick={loadMore}
                  disabled={loading}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={loading ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    scale: { duration: 0.2 },
                    boxShadow: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Loading...
                    </div>
                  ) : (
                    'Load More'
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

PortfolioBrowser.displayName = 'PortfolioBrowser';

export default PortfolioBrowser;