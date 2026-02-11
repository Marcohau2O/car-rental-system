import dashboardService from "../services/dashboard.service.js";

export const getDashboardData = async (_, res) => {
    res.json(await dashboardService.getDashboard());
}

export const getCalendario = async (_, res) => {
    res.json(await dashboardService.getCalendarioReserva())
}