import prisma from "../models/prisma.js"

export const AutoService = {
    getAll: () => prisma.auto.findMany(),
    getById: (id) => prisma.auto.findUnique({ where: { id } }),
    create: (data) => prisma.auto.create({ data }),
    update: (id, data) =>
        prisma.auto.update({ where: { id }, data }),
    delete: (id) =>
        prisma.auto.delete({ where: { id } })
}