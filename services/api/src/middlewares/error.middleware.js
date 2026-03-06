export const erroHandler = (err, req, res, next) => {
    console.error("ERROR GLOBAL", err);

    if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            message: "Datos duplicado",
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            message: "Registro no encontrado"
        });
    }

    if (err.code === "P2003") {
        return res.status(400).json({
            success: false,
            message: "Relación inválida o dependencia existente",
        });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Token inválido",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expirado",
        });
    }

    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err.message === 'Credenciales inválidas') {
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }

    if (err.message === "No autorizado") {
        return res.status(403).json({
            success: false,
            message: err.message,
        });
    }

    if (err.message === "Datos incompletos") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: "Error interno del servidor"
    })
}