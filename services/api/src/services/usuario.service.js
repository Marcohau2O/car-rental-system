import prisma from "../models/prisma.js";
import bcrypt from "bcryptjs";

export const UsuarioService = {
  getAll: async () => {
    return prisma.usuario.findMany({
      include: {
        rol: {
          include: {
            permisos: true
          }
        }
      }
    });
  },

  getById: async (id) => {
    return prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: { include: { permisos: true } }
      }
    });
  },

  create: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.usuario.create({
      data: {
        nombre: data.nombre,
        correo: data.correo,
        telefono: data.telefono,
        password: hashedPassword,
        roleId: data.roleId
      }
    });
  },

  update: async (id, data) => {
    return prisma.usuario.update({
      where: { id },
      data: {
        nombre: data.nombre,
        correo: data.correo,
        telefono: data.telefono
      }
    });
  },

  delete: async (id) => {
    return prisma.usuario.delete({
      where: { id }
    });
  },

  // assignRole: async (id, roleId) => {
  //   return prisma.usuario.update({
  //     where: { id },
  //     data: { roleId }
  //   });
  // }
};
