import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { crearPago } from "../controllers/pago.controller.js"

const router = Router()

router.post('/', authMiddleware, crearPago)

export default router;