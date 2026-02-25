import { crearPago } from "../api/pago.api";

export const PagoService = {
    pagar: async (data) => {
        const { data: response } = await crearPago(data)
        return response
    }
}