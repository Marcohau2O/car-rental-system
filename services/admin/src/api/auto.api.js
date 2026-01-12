import api from "./axios";

export const getAutos = () =>
  api.get("/autos");

export const getAuto = (id) =>
  api.get(`/autos/${id}`);

export const createAuto = (payload) =>
  api.post("/autos", payload);

export const updateAuto = (id, payload) =>
  api.put(`/autos/${id}`, payload);

export const deleteAuto = (id) =>
  api.delete(`/autos/${id}`);