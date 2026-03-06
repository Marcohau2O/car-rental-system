import api from "./axios";

export const getReservacionById = () =>
    api.get('/reservacion/mis-reservaciones');

export const crearReservacion = (payload) =>
    api.post("/reservacion", payload);

export const downloadReserva = (id) =>
    api.get(`/pdf/${id}`, {
        responseType: "blob"
    })