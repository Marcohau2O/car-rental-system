import prisma from "../models/prisma.js";

export const createLog = async ({ accion, descripcion, usuarioId }) => {
  await prisma.logs.create({
    data: {
      accion,
      descripcion,
      usuarioId,
    },
  });
};
