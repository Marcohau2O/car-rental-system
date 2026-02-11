import { defineStore } from "pinia"
import { login, logout } from "../services/auth.service"
import { getUser } from "../utils/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: getUser(),
        token: sessionStorage.getItem("token"),
        loading: false,
        error: null,
    }),

    actions: {
        async login(credenciales) {
            try {
                this.loading = true;
                this.error = null;

                const data = await login(credenciales);
                this.user = getUser()
                this.token = data.token;
            } catch (error) {
                this.error = error.response?.data?.message || "Error al iniciar session";
                throw error;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            logout();
            this.user = null;
            this.token = false;
        },
    },
})