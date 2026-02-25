import prisma from "../models/prisma.js";
import { ReservacionService } from "../services/reservacion.service.js";

export const crearPago = async (req, res) => {
    try {
        const usuarioId = req.user.id
        const { reservacionId, metodo, tipoPago } = req.body

        const reservacion = await prisma.reservacion.findUnique({
            where: { id: Number(reservacionId) }
        })

        if (!reservacion) {
            return res.status(404).json({ message: "Reservacion no encontrada" })
        }

        if (reservacion.usuarioId !== usuarioId) {
            return res.status(403).json({ message: "No autorizado" })
        }

        let cantidad = 0
        let estadoPago = ""

        if (tipoPago === "completo") {
            cantidad = reservacion.total
            estadoPago = "PAGADO COMPLETO"
        }

        if (tipoPago === "anticipo") {
            cantidad = reservacion.total * 0.30
            estadoPago = "ANTICIPO_30%"
        }

        const pago = await ReservacionService.pagoReservacion({
            cantidad,
            metodo,
            estado: estadoPago,
            reservacionId: reservacion.id
        })

        res.status(201).json({
            message: "Pago registrado correctamente",
            pago
        })

    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Error al registrar pago" })
    }
}