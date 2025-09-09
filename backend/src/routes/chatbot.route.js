import { Router } from 'express';
import {
  getChatSuggestions,
  getRecruiters,
  getJobs
} from '../controllers/chatbot.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyJWT);

// Get chatbot suggestions based on user's portfolio
router.post('/suggestions', getChatSuggestions);

// Get all available recruiters
router.get('/recruiters', getRecruiters);

// Get all available jobs
router.get('/jobs', getJobs);

export default router;