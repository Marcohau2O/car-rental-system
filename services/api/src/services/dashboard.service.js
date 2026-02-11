import prisma from "../models/prisma.js";

const getDashboard = async () => {
    const [ totalCaros, reservasActivas, ingresosTotales, totalUsuarios, reservasRecientes] = await Promise.all([
        prisma.auto.count(),

        prisma.reservacion.count({ where: { estado: "PENDIENTE" } }),

        prisma.reservacion.aggregate({ _sum: { total: true } }),

        prisma.usuario.count(),

        prisma.reservacion.findMany({
            take: 5, orderBy: { fechaCreacion: "desc" },
            include: { usuario: { select: { nombre: true } },
                auto: { select: { marca: true, modelo: true } } } })
    ]);

    return {
        stats: { totalCaros, reservasActivas, totalIngresos: ingresosTotales._sum.total, totalUsuarios },
        reservasRecientes: reservasRecientes.map(r => ({
            id: r.id, cliente: r.usuario.nombre, auto: `${r.auto.marca} ${r.auto.modelo}`, dia: r.fechaCreacion, estado: r.estado }))
    };
};

const getCalendarioReserva = async () => {
    const reservaciones = await prisma.reservacion.findMany({
        include: {
            auto: { select: { marca: true, modelo: true} },
            usuario: { select: { nombre: true} }
        }
    });
    
    return reservaciones.map(r => ({
        id: r.id,
        titulo: `${r.auto.marca} ${r.auto.modelo} - ${r.usuario.nombre}`,
        inicio: r.fechainicio,
        fin: r.fechafin,
        color:
            r.estado === "PENDIENTE"
            ? "#16a34a"
            : r.estado === "CANCELADA"
            ? "#dc2626"
            : "#2563eb"
    }));
};

export default {
    getDashboard,
    getCalendarioReserva
};