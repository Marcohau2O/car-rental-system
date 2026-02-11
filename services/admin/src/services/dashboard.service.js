import { getCalendarioReserva, getDashboardData } from "../api/dashboard.api";

export const DashboardService = {
    getDatadashboard: async () => {
        const { data } = await getDashboardData();
        return data;
    },

    getCalendario: async () => {
        const { data } = await getCalendarioReserva();
        return data;
    }
}