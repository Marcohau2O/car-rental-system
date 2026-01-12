import { Router } from "express";
import { getRoles } from "../controllers/role.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";

const router = Router();

// Admin
// router.post("/", authMiddleware, checkPermission("rol:manage"), createRole);
router.get("/", authMiddleware, checkPermission("user:create"), getRoles);

export default router;
