import prisma from "../models/prisma.js"

export const ReservacionService = {
    getAllReservaciones: () => prisma.reservacion.findMany({
        include: {
            usuario: {
                select: {
                    id: true,
                    nombre: true,
                    correo: true
                },
            },
            auto: {
                select: {
                    id: true,
                    marca: true,
                    modelo: true
                }
            }
        },
        orderBy: {
            fechaCreacion: 'desc'
        }
    }),
    getReservacionesByUser: (usuarioId) => prisma.reservacion.findMany({
        where: { usuarioId},
         include: {
            auto: true
         },
         orderBy: {
            fechaCreacion: 'desc'
         }
    }),
    getReservacionesById: (id) => prisma.reservacion.findUnique({
        where: { id: Number(id) },
        include: {
            usuario: true,
            auto: true,
        }
    }),
    updateEstadoReservacion: (id, estado) => prisma.reservacion.update({
        where: { id },
        data: { estado }
    }),

    createReservacion: (data) => prisma.reservacion.create({ data }),
    // updateReservacion: (id, data) => prisma.reservacion.update({ where: { id }, data }),
    // delete: (id) => prisma.reservacion.delete({ where: { id } })
}