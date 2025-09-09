import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  getPortfolio,
  updatePortfolio,
  addProject,
  updateProject,
  deleteProject,
  browsePortfolios,
  getFeaturedPortfolios,
} from "../controllers/portfolio.controller.js";

const router = Router();

// Public routes
router.route("/browse").get(browsePortfolios);
router.route("/featured").get(getFeaturedPortfolios);
router.route("/:username").get(getPortfolio);

// Protected routes (require authentication)
router.use(verifyJWT);

// Portfolio routes
router.route("/").put(updatePortfolio);

// Project routes
router.route("/projects").post(addProject);
router
  .route("/projects/:projectId")
  .put(updateProject)
  .delete(deleteProject);

export default router;
