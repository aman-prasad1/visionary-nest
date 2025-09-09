import { Router } from "express";

const router = Router();

import { test } from "../controllers/test.controller.js";

router.route("/").get(test);

export default router;