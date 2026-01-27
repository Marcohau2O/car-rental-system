import { Router } from "express";
import { login, registerPublic, loginPublic } from "../controllers/auth.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { checkPermission } from "../middlewares/permission.middleware.js";

const router = Router();

// Público
router.post("/registerPublic", registerPublic);
router.post("/loginPublic", loginPublic)

//Panel Administrador
router.post("/login", login);
// router.post("/logout", authMiddleware, logout)


export default router;
