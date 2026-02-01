import { getReservaciones, getReservacionesByUser, updateEstado, getReservasById } from "../api/reservacion.api";

export const ReservacionService = {
    getAll: async () => {
            const { data } = await getReservaciones();
            return data;
    },

    getById: async (id) => {
        const { data } = await getReservacionesByUser(id)
        return data;
    },

    getReservacionById: async (id) => {
        const { data } = await getReservasById(id)
        return data;  
    },

    updateEstado: async (id, reserva) => {
        const { data } = await updateEstado();
        return data;
    }

}