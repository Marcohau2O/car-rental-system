import { ReservacionService } from "../services/reservacion.service.js";
import { logAction } from "../utils/logAction.js";

export const getReservaciones = async (req, res) => {
    const reservacion = await ReservacionService.getAllReservaciones();
    res.json(reservacion)
}

export const crearReservacion = async (req, res) => {
    try {
        const usuarioId = req.user.id
        const { fechainicio, fechafin, horainicio, horafin, total, seguro, sillabebe, autoId } = req.body

        if (!fechainicio || !fechafin || !autoId) {
            return res.status(400).json({ message: 'Datos incompletos' })
        }

        const licenciaPath = req.file ? `/uploads/licencias/${req.file.filename}` : null

        const reservacion = await ReservacionService.createReservacion({
            confirmacion: `RES-${Date.now()}`,
            fechainicio: new Date(fechainicio),
            fechafin: new Date(fechafin),
            horainicio,
            horafin,
            total: Number(total),
            seguro: seguro === 'true' || seguro === true,
            sillabebe: sillabebe === 'true' || sillabebe === true,
            usuarioId: Number(usuarioId),
            autoId: Number(autoId),
            estado: 'PENDIENTE',
            licencia: licenciaPath
        })

        res.status(201).json(reservacion)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear la reservacion' })
    }
}

export const obtenerMisReservaciones = async (req, res) => {
    try {
        const usuarioId = req.user.id
        const reservacion = await ReservacionService.getReservacionesByUser(usuarioId)

        res.json(reservacion)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservaciones' })
    }
}

export const obtenerReservacion = async (req, res) => {
    try {
        const id = req.params.id
        const reservacion = await ReservacionService.getReservacionesById(id)

        if (!reservacion) {
            return res.status(404).json({ message: 'Reservacion no encontrado' })
        }

        res.json(reservacion)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservacion ptm ya jala foker' })
    }
}

export const cambiarEstado = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { estado } = req.body

        const reservacion = await ReservacionService.updateEstadoReservacion(id, estado)
        res.json(reservacion)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado' })
    }
}