import { createLog } from "../services/log.service.js";

export const logAction = async({
    req,
    accion,
    descripcion,
}) => {
    if (!req.user) return;

    await createLog({
        accion,
        descripcion,
        usuarioId: req.user.id,
    })
}