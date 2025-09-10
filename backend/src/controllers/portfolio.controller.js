import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Portfolio } from "../models/portfolio.model.js";
import { User } from "../models/user.model.js";

// Get user's portfolio
export const getPortfolio = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  // Find user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Find portfolio by user ID
  const portfolio = await Portfolio.findOne({ userId: user._id });
  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Portfolio retrieved successfully", portfolio));
});

// Update portfolio
export const updatePortfolio = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const updateData = req.body;

  // Validate required fields
  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  // Try to update existing portfolio, or create if it doesn't exist
  let updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  // If portfolio doesn't exist, create it
  if (!updatedPortfolio) {
    updatedPortfolio = await Portfolio.create({
      userId,
      ...updateData
    });
  }

  // Mark user's profile as complete
  await User.findByIdAndUpdate(userId, { isProfileComplete: true });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Portfolio updated successfully", updatedPortfolio)
    );
});

// Add project to portfolio
export const addProject = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const projectData = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId },
    { $push: { projects: projectData } },
    { new: true, runValidators: true }
  );

  if (!updatedPortfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Project added successfully", updatedPortfolio));
});

// Update project in portfolio
export const updateProject = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { projectId } = req.params;
  const updateData = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId, "projects._id": projectId },
    { $set: { "projects.$": { ...updateData, _id: projectId } } },
    { new: true, runValidators: true }
  );

  if (!updatedPortfolio) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", updatedPortfolio));
});

// Delete project from portfolio
export const deleteProject = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { projectId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId },
    { $pull: { projects: { _id: projectId } } },
    { new: true }
  );

  if (!updatedPortfolio) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Project deleted successfully", updatedPortfolio));
});

// Get all public portfolios (for browsing)
export const browsePortfolios = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, skills, userType } = req.query;
  const skip = (page - 1) * limit;

  // Build the query
  const query = { isPublic: true };
  
  // Add search filter
  if (search) {
    query.$text = { $search: search };
  }
  
  // Add skills filter
  if (skills) {
    const skillsArray = skills.split(',');
    query['skills.name'] = { $in: skillsArray };
  }
  
  // Add user type filter
  if (userType) {
    const users = await User.find({ userType }).select('_id');
    query.userId = { $in: users.map(u => u._id) };
  }

  // Get paginated results
  const [portfolios, total] = await Promise.all([
    Portfolio.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'fullname username avatar userType'),
    Portfolio.countDocuments(query)
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Portfolios retrieved successfully", {
      portfolios,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  );
});

// Get featured portfolios (for home page)
export const getFeaturedPortfolios = asyncHandler(async (req, res) => {
  const featuredPortfolios = await Portfolio.aggregate([
    { $match: { isPublic: true } },
    { $sample: { size: 6 } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
              userType: 1
            }
          }
        ]
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        taglineLeft: 1,
        taglineHighlight: 1,
        taglineRight: 1,
        subTagline: 1,
        avatarUrl: 1,
        skills: { $slice: ['$skills', 5] },
        user: 1
      }
    }
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Featured portfolios retrieved successfully",
        featuredPortfolios
      )
    );
});
