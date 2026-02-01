import api from './axios';

export const getReservaciones = () =>
    api.get("/reservacion");

export const getReservacionesByUser = () =>
    api.get(`/reservacion/mis-reservaciones`)

export const getReservasById = (id) =>
    api.get(`/reservacion/${id}`)

export const updateEstado = (id, payload) =>
    api.put(`/reservacion/${id}`, payload)