import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = Router();

// This route is protected, so only logged-in users can upload files.
router.use(verifyJWT);

router.route("/").post(upload.single('file'), uploadFile);

export default router;