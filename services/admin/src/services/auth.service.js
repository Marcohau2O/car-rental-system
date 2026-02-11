import { loginRequest } from "../api/auth.api";

export const login = async (credenciales) => {
    const { data } = await loginRequest(credenciales);

    sessionStorage.setItem("token", data.token);

    return data
};

export const logout = () => {
    sessionStorage.clear()
};
