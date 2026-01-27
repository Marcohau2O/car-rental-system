import { defineStore } from "pinia"
import { loginRequestP, registerRequestP, logout } from "../services/auth.service"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem("user")) || null,
        token: sessionStorage.getItem("token"),
        loading: false,
        error: null,
    }),

    actions: {
        async loginStore(credenciales) {
            try {
                this.loading = true;
                this.error = null;

                const data = await loginRequestP(credenciales);
                this.user = data.user;
                this.token = data.token;
            } catch (error) {
                this.error = error.response?.data?.message || "Error al iniciar session";
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async registerStore(payload) {
            try {
                this.loading = true
                const data = await registerRequestP(payload)
            } catch (error) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        logoutStore() {
            logout();
            this.user = null;
            this.token = false;
        }
    }
})