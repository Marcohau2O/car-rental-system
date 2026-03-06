import prisma from "../models/prisma.js";

export const generarPDFService = {
    getReserva: (id) => prisma.reservacion.findUnique({
        where: { id: Number(id) },
        include: {
            usuario: true,
            auto: true,
            pago: true
        }
    }),
}