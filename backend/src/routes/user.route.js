import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
    getMyDetails,
    getUserDetails,
    updateUserProfile,
    changeProfilePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/")
    .get(verifyJWT, getMyDetails)
    .patch(verifyJWT, upload.single('avatar'), updateUserProfile)
    
router.route("/:id").get(getUserDetails);

router.route("/change-password").put(verifyJWT, changeProfilePassword);

export default router;
