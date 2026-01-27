import api from "./axios";

export const getAutosPublic = () =>
    api.get("/autos");

export const getAutoPublic = (id) =>
    api.get(`/autos/${id}`)