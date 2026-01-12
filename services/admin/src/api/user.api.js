import api from "./axios";

export const getUsuarios = () =>
    api.get("/usuario")

export const getUsuario = (id) =>
    api.get(`/usuario/${id}`)

export const createUsuario = (payload) =>
  api.post("/usuario", payload);

export const updateUsuario = (id, payload) =>
  api.put(`/usuario/${id}`, payload);

export const deleteUsuario = (id) =>
  api.delete(`/usuario/${id}`);

export const assignRole = (id, roleId) =>
  api.put(`/usuario/${id}/rol`, { roleId });