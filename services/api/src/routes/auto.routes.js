import { Router } from "express";
import {
  getAutos, getAuto, createAuto, updateAuto, deleteAuto
} from "../controllers/auto.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";

const router = Router();

// Público
router.get("/", getAutos);

// Admin
router.get("/:id", getAuto);
router.post("/", authMiddleware, checkPermission("auto:create"), createAuto);
router.put("/:id", authMiddleware, checkPermission("auto:update"), updateAuto);
router.delete("/:id", authMiddleware, checkPermission("auto:delete"), deleteAuto);

export default router;
