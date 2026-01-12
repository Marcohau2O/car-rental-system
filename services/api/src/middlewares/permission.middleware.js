export const checkPermission = (permission) => {
  return (req, res, next) => {
    // const permisos = req.user.rol.permiso.map(p => p.accion);

    if (!req.user?.permissions?.includes(permission)) {
      return res.status(401).json({
        message: "Permiso denegado",
        required: permission,
        userPermissions: req.user?.permissions,
      });
    }

    next();
  };
};
