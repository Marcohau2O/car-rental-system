import api from "./axios";

export const crearPago = (payload) =>
    api.post("/pago", payload);