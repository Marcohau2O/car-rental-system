import { getReservacionById, crearReservacion, downloadReserva } from "../api/reservacion.api";

export const ReservacionService = {
    getById: async () => {
        const { data } = await getReservacionById();
        return data;
    },

    crearReserva: async (reserva) => {
        const { data } = await crearReservacion(reserva);
        return data;
    },

    ReservaPDF: async (id) => {
        return await downloadReserva(id);
    }
}