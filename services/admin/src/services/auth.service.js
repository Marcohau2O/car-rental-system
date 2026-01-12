import { loginRequest } from "../api/auth.api";

export const login = async (credenciales) => {
    const { data } = await loginRequest(credenciales);

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    return data
};

export const logout = () => {
    sessionStorage.clear()
};
