import api from "./axios";

export const getDashboardData = () =>
    api.get("/dashboard");

export const getCalendarioReserva = () =>
    api.get("/dashboard/calendario")