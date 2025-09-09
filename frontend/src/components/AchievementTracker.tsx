import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Target, Zap, BookOpen, Code, Users, Calendar, Download } from 'lucide-react';
import CertificateGenerator from './CertificateGenerator';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'skill' | 'project' | 'milestone' | 'social';
  unlockedAt: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementTrackerProps {
  userId?: string;
}

const AchievementTracker: React.FC<AchievementTrackerProps> = ({ userId }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Mock achievements data - in real app, this would come from API
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Portfolio Created',
        description: 'Successfully created your first portfolio on our platform',
        icon: 'Trophy',
        category: 'milestone',
        unlockedAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'React Expert',
        description: 'Added React as a skill with 80%+ proficiency',
        icon: 'Code',
        category: 'skill',
        unlockedAt: '2024-02-01',
      },
      {
        id: '3',
        title: 'Project Showcase',
        description: 'Added 3+ projects to your portfolio',
        icon: 'Target',
        category: 'project',
        unlockedAt: '2024-02-15',
      },
      {
        id: '4',
        title: 'Social Connector',
        description: 'Connected with 5+ recruiters',
        icon: 'Users',
        category: 'social',
        unlockedAt: '2024-03-01',
      },
      {
        id: '5',
        title: 'Learning Journey',
        description: 'Completed 10+ hours of learning activities',
        icon: 'BookOpen',
        category: 'milestone',
        unlockedAt: '2024-03-15',
        progress: 10,
        maxProgress: 10,
      },
    ];

    setAchievements(mockAchievements);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Trophy: <Trophy className="text-yellow-500" size={24} />,
      Star: <Star className="text-blue-500" size={24} />,
      Award: <Award className="text-purple-500" size={24} />,
      Target: <Target className="text-green-500" size={24} />,
      Zap: <Zap className="text-orange-500" size={24} />,
      BookOpen: <BookOpen className="text-indigo-500" size={24} />,
      Code: <Code className="text-red-500" size={24} />,
      Users: <Users className="text-pink-500" size={24} />,
    };
    return icons[iconName] || <Award className="text-gray-500" size={24} />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      skill: 'from-blue-500 to-cyan-500',
      project: 'from-green-500 to-emerald-500',
      milestone: 'from-purple-500 to-pink-500',
      social: 'from-orange-500 to-red-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const generateCertificate = (achievement: Achievement) => {
    const certificateData = {
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      achievement: achievement.title,
      date: achievement.unlockedAt,
      recipientName: 'John Doe', // This would come from user data
      issuer: 'VisionaryNest Platform',
    };

    setSelectedCertificate(certificateData);
    setShowCertificate(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Your Achievements</h2>
        <p className="text-gray-400">Track your progress and earn certificates for your accomplishments</p>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            {/* Achievement Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(achievement.category)} rounded-full flex items-center justify-center`}>
                {getIcon(achievement.icon)}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => generateCertificate(achievement)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:shadow-lg"
              >
                <Download size={16} />
              </motion.button>
            </div>

            {/* Achievement Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
              <p className="text-gray-400 text-sm">{achievement.description}</p>

              {/* Progress Bar if applicable */}
              {achievement.progress !== undefined && achievement.maxProgress && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${getCategoryColor(achievement.category)} rounded-full`}
                    />
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                <Calendar size={12} />
                <span>{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="mt-4">
              <span className={`inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white capitalize`}>
                {achievement.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && selectedCertificate && (
          <CertificateGenerator
            certificateData={selectedCertificate}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Achievement Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{achievements.length}</div>
            <div className="text-sm text-gray-400">Total Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {achievements.filter(a => a.category === 'skill').length}
            </div>
            <div className="text-sm text-gray-400">Skills Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {achievements.filter(a => a.category === 'project').length}
            </div>
            <div className="text-sm text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {achievements.filter(a => a.category === 'milestone').length}
            </div>
            <div className="text-sm text-gray-400">Milestones Reached</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementTracker;