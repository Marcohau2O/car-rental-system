import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { checkPermission } from "../middlewares/permission.middleware.js";

const router = Router();

// Público
router.post("/register", register);
router.post("/login", login);
// router.post("/logout", authMiddleware, logout)

// Admin
// router.post(
//   "/admin/create-user",
//   authMiddleware,
//   checkPermission("CREATE_USER"),
//   createUserByAdmin
// );

export default router;
