import Router from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuario.controller.js";

const router = Router();

// Público
router.get("/", getUsuarios);

// Admin
router.get("/:id", getUsuario);
router.post("/", authMiddleware, checkPermission("user:create"), createUsuario);
router.put("/:id", authMiddleware, checkPermission("user:update"), updateUsuario);
router.delete("/:id", authMiddleware, checkPermission("user:delete"), deleteUsuario);

// router.put(
//   "/:id/rol",
//   authMiddleware,
//   checkPermission("user:assignRole"),
//   assignRole
// );

export default router;