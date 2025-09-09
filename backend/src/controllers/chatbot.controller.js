import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Portfolio } from '../models/portfolio.model.js';
import { User } from '../models/user.model.js';

// Mock data for recruiters and jobs
const mockRecruiters = [
  {
    id: '1',
    name: 'Arjun Mehta',
    company: 'TCS',
    position: 'Senior Software Engineer',
    linkedin: 'https://linkedin.com/in/arjun-mehta',
    matchScore: 95,
    reason: 'Your React and Node.js skills match their requirements perfectly'
  },
  {
    id: '2',
    name: 'Kavita Rao',
    company: 'Infosys',
    position: 'Tech Lead',
    linkedin: 'https://linkedin.com/in/kavita-rao',
    matchScore: 88,
    reason: 'Strong Python background aligns with their current projects'
  },
  {
    id: '3',
    name: 'Rohit Jain',
    company: 'Wipro',
    position: 'Project Manager',
    linkedin: 'https://linkedin.com/in/rohit-jain',
    matchScore: 82,
    reason: 'Your project management experience is valuable'
  },
  {
    id: '4',
    name: 'Meera Iyer',
    company: 'Accenture',
    position: 'HR Manager',
    linkedin: 'https://linkedin.com/in/meera-iyer',
    matchScore: 75,
    reason: 'Looking for candidates with your skill set'
  }
];

const mockJobs = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    type: 'Full-time',
    location: 'Remote',
    matchScore: 92,
    reason: 'Your portfolio shows excellent React and Node.js experience'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    type: 'Internship',
    location: 'Bangalore',
    matchScore: 85,
    reason: 'Great UI/UX projects that match their needs'
  },
  {
    id: '3',
    title: 'Python Developer',
    company: 'DataTech',
    type: 'Full-time',
    location: 'Mumbai',
    matchScore: 78,
    reason: 'Strong Python skills required for data processing'
  },
  {
    id: '4',
    title: 'React Developer',
    company: 'WebSolutions',
    type: 'Contract',
    location: 'Delhi',
    matchScore: 88,
    reason: 'Modern React applications development'
  }
];

// Function to analyze portfolio and suggest recruiters/jobs
const analyzePortfolio = (portfolio) => {
  const skills = portfolio.skills || [];
  const projects = portfolio.projects || [];
  const experience = portfolio.experiences || [];

  // Simple matching logic based on skills
  const skillNames = skills.map(skill => skill.name?.toLowerCase() || '');

  let suggestedRecruiters = [];
  let suggestedJobs = [];

  // Match recruiters based on skills
  mockRecruiters.forEach(recruiter => {
    let matchScore = 0;
    let reason = '';

    if (skillNames.includes('react') && recruiter.company === 'TCS') {
      matchScore = 95;
      reason = 'Your React and Node.js skills match their requirements perfectly';
    } else if (skillNames.includes('python') && recruiter.company === 'Infosys') {
      matchScore = 88;
      reason = 'Strong Python background aligns with their current projects';
    } else if (skillNames.includes('javascript') || skillNames.includes('node.js')) {
      matchScore = Math.floor(Math.random() * 20) + 70;
      reason = 'Your technical skills align with their needs';
    }

    if (matchScore > 0) {
      suggestedRecruiters.push({
        ...recruiter,
        matchScore,
        reason
      });
    }
  });

  // Match jobs based on skills
  mockJobs.forEach(job => {
    let matchScore = 0;
    let reason = '';

    if (skillNames.includes('react') && job.title.includes('React')) {
      matchScore = 88;
      reason = 'Modern React applications development';
    } else if (skillNames.includes('python') && job.title.includes('Python')) {
      matchScore = 78;
      reason = 'Strong Python skills required for data processing';
    } else if (skillNames.includes('javascript') || skillNames.includes('node.js')) {
      matchScore = Math.floor(Math.random() * 15) + 75;
      reason = 'Your portfolio shows relevant technical experience';
    }

    if (matchScore > 0) {
      suggestedJobs.push({
        ...job,
        matchScore,
        reason
      });
    }
  });

  // Sort by match score
  suggestedRecruiters.sort((a, b) => b.matchScore - a.matchScore);
  suggestedJobs.sort((a, b) => b.matchScore - a.matchScore);

  return {
    recruiters: suggestedRecruiters.slice(0, 3), // Top 3 recruiters
    jobs: suggestedJobs.slice(0, 3) // Top 3 jobs
  };
};

// Get chatbot suggestions
export const getChatSuggestions = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json(
      new ApiResponse(401, null, 'User not authenticated')
    );
  }

  try {
    // Get user's portfolio
    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json(
        new ApiResponse(404, null, 'Portfolio not found')
      );
    }

    // Analyze portfolio and get suggestions
    const suggestions = analyzePortfolio(portfolio);

    return res.status(200).json(
      new ApiResponse(200, suggestions, 'Suggestions generated successfully')
    );

  } catch (error) {
    console.error('Error generating suggestions:', error);
    return res.status(500).json(
      new ApiResponse(500, null, 'Failed to generate suggestions')
    );
  }
});

// Get all available recruiters (for browsing)
export const getRecruiters = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, mockRecruiters, 'Recruiters fetched successfully')
  );
});

// Get all available jobs (for browsing)
export const getJobs = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, mockJobs, 'Jobs fetched successfully')
  );
});