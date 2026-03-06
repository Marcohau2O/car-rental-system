import { Router } from "express";
import { generarPDFReserva } from "../controllers/pdf.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/:id', authMiddleware, generarPDFReserva)

export default router;