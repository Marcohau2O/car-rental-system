import prisma from "../models/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { createLog } from "./log.service.js";

export const registerPublicUser = async (data) => {
    const user = await prisma.usuario.create({
        data: {
            ...data,
            password: await hashPassword(data.password),
            roleId: 2,
        },
    });
    
    return user;
};

export const loginPublicUser = async ({ correo, password }) => {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) throw new Error("Credenciales inválidas");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Credenciales inválidas");

    const token = generateToken(user);

    return { user, token };
};

// export const adminCreateUser = async (data, adminId) => {
//     const user = await prisma.usuario.create({
//         data: {
//         ...data,
//         password: await hashPassword(data.password),
//         },
//     });

//     await createLog({
//         accion: "CREATE_USER",
//         descripcion: `Admin creó usuario: ${user.correo}`,
//         usuarioId: adminId,
//     });

//     return user;
// };

export const loginService = async ({ correo, password }) => {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) throw new Error("Credenciales inválidas");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Credenciales inválidas");

    const token = generateToken(user);

    await createLog({
        accion: "LOGIN",
        descripcion: `Inicio sesión: ${user.correo}`,
        usuarioId: user.id,
    });

    return { user, token };
};