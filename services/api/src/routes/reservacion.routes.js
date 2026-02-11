import { Router } from "express";
import { getReservaciones, crearReservacion, obtenerMisReservaciones, obtenerReservacion, cambiarEstado } from "../controllers/reservacion.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { uploadLicenciaImage } from "../middlewares/uploadLicencia.js";

const router = Router()

//publico
router.get('/', getReservaciones)
router.get('/mis-reservaciones', authMiddleware, obtenerMisReservaciones)
router.post('/', authMiddleware, uploadLicenciaImage.single('licencia'), crearReservacion)

//administrador
router.put('/:id/estado', authMiddleware, checkPermission("reservation:updatestatus"), cambiarEstado)
router.get('/:id', authMiddleware, checkPermission("reservas:view"), obtenerReservacion) // En esta ruta tiene que ir una checkPermission para los empleados 


export default router;