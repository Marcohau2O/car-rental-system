import prisma from "../models/prisma.js";

export const RoleService = {
  // create: (nombre, permisos) =>
  //   prisma.rol.create({
  //     data: {
  //       nombre,
  //       permisos: {
  //         create: permisos.map(accion => ({ accion }))
  //       }
  //     }
  //   }),

  getAll: () =>
    prisma.rol.findMany({ include: { permisos: true } }),

};
