import api from "./axios";

export const getReservacionById = () =>
    api.get('/reservacion/mis-reservaciones');

export const crearReservacion = (payload) =>
    api.post("/reservacion", payload);