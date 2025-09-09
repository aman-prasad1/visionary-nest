import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Edit, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
import AchievementTracker from '../components/AchievementTracker';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user?.username) return;

      try {
        const response = await apiClient.getPortfolio(user.username);
        if (response.success) {
          setPortfolio(response.data);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user?.username]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleEditPortfolio = () => {
    navigate('/create');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img
              src={user?.avatar?.public_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMzc0MTUxIi8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm9yPSIwIDAgNTAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMjUiIHk9IjI1Ij4KPHBhdGggZD0iTTI1IDI1YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS7OSA0IDQgNC00em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo8L3N2Zz4='}
              alt={user?.fullname}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-purple-500/50"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">{user?.fullname}</h1>
              <p className="text-gray-300">@{user?.username}</p>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">{user?.bio || 'No bio available'}</p>
            </div>
            <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={handleEditPortfolio}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                <Edit size={16} />
                <span className="hidden sm:inline">Edit Portfolio</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Stats */}
        {portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400">{portfolio.projects?.length || 0}</div>
              <div className="text-gray-300 mt-1">Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-400">{portfolio.certificates?.length || 0}</div>
              <div className="text-gray-300 mt-1">Certificates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400">{portfolio.skills?.length || 0}</div>
              <div className="text-gray-300 mt-1">Skills</div>
            </div>
          </motion.div>
        )}

        {/* Portfolio Preview */}
        {portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Portfolio Preview</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tagline</label>
                <p className="text-white">
                  {portfolio.taglineLeft} <span className="text-purple-400">{portfolio.taglineHighlight}</span> {portfolio.taglineRight}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">About</label>
                <p className="text-gray-300">{portfolio.aboutShort}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Experience</label>
                <p className="text-white">{portfolio.yearsExperience} years</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate(`/portfolio/${user?.username}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
              >
                View Full Portfolio
              </button>
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-8"
        >
          <AchievementTracker userId={user?._id} />
        </motion.div>

        {!portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
          >
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">No Portfolio Yet</h2>
            <p className="text-gray-300 mb-6">Create your portfolio to showcase your skills and projects.</p>
            <button
              onClick={handleEditPortfolio}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Create Portfolio
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
