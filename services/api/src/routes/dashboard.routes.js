import { Router } from "express";
import { getDashboardData, getCalendario } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authMiddleware, checkPermission("dashboard:view"), getDashboardData)
router.get("/calendario", authMiddleware, checkPermission("calendario:view"), getCalendario)

export default router;