import { Router } from "express";
import {
  getAutos, getAuto, createAuto, updateAuto, deleteAuto
} from "../controllers/auto.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { uploadAutoImage } from "../middlewares/upload.js";

const router = Router();

// Público
router.get("/", getAutos);

// Admin
router.get("/:id", getAuto);
router.post("/", authMiddleware, checkPermission("auto:create"), uploadAutoImage.single("imagen"), createAuto);
router.put("/:id", authMiddleware, checkPermission("auto:update"), uploadAutoImage.single("imagen"), updateAuto);
router.delete("/:id", authMiddleware, checkPermission("auto:delete"), deleteAuto);

export default router;
