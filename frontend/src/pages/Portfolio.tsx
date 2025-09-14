import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BrowsePortfolio from '../components/BrowsePortfolio';
import { apiClient } from '../lib/api';

const Portfolio = () => {
  const { userId } = useParams();
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.getPortfolio();
        if (response.success && response.data) {
          setPortfolioData(response.message);
        } else {
          setError(response.error || 'Portfolio not found');
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('Failed to load portfolio');
      }
      setLoading(false);
    };

    fetchPortfolioData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Portfolio Not Found</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Portfolio Not Found</h2>
          <p className="text-gray-400">The portfolio you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <BrowsePortfolio data={portfolioData} />;
};

export default Portfolio;
