import { UsuarioService } from "../services/usuario.service.js";
import { logAction } from "../utils/logAction.js";

export const getUsuarios = async (req, res) => {
  const usuarios = await UsuarioService.getAll();
  res.json(usuarios);
};

export const getUsuario = async (req, res) => {
  const id = Number(req.params.id);

  if(!id) {
    return res.status(400).json({
      message: "Id Invalido o no proporcionado"
    });
  }

  const user = await UsuarioService.getById(id)

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado "})
  }

  res.json(user);
};

export const createUsuario = async (req, res) => {
  const usuario = await UsuarioService.create(req.body);

  await logAction({
    req,
    accion: "USER_CREATE",
    descripcion: `Usuario creado ID ${usuario.id}`
  });

  res.status(201).json(usuario);
};

export const updateUsuario = async (req, res) => {
  const usuario = await UsuarioService.update(+req.params.id, req.body);

  await logAction({
    req,
    accion: "USER_UPDATE",
    descripcion: `Usuario actualizado ID ${req.params.id}`
  });

  res.json(usuario);
};

export const deleteUsuario = async (req, res) => {
  await UsuarioService.delete(+req.params.id);

  await logAction({
    req,
    accion: "USER_DELETE",
    descripcion: `Usuario eliminado ID ${req.params.id}`
  });

  res.json({ message: "Usuario eliminado" });
};

// export const assignRole = async (req, res) => {
//   const usuario = await UsuarioService.assignRole(
//     +req.params.id,
//     req.body.roleId
//   );

//   await logAction({
//     req,
//     accion: "USER_ASSIGN_ROLE",
//     descripcion: `Rol asignado al usuario ID ${req.params.id}`
//   });

//   res.json(usuario);
// };
