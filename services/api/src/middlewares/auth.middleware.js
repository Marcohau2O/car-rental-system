import { verifyToken } from "../utils/jwt.js";
import prisma from "../models/prisma.js";

export const authMiddleware = async (req, res, next) => {
  // console.log("AUTH HEADER:", req.headers.authorization);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token requerido");

    const decoded = verifyToken(token);

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: {
        rol: {
          include: { permisos: true },
        },
      },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const permissions = user.rol.permisos.map(p => p.accion);

    req.user = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol.nombre,
      permissions
    };

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
