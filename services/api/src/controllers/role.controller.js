import { RoleService } from "../services/role.service.js";

// export const createRole = async (req, res) => {
//   const { nombre, permisos } = req.body;
//   res.status(201).json(await RoleService.create(nombre, permisos));
// };

export const getRoles = async (_, res) => {
  res.json(await RoleService.getAll());
};