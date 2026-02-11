import { jwtDecode } from "jwt-decode"

export const getToken = () => {
    return sessionStorage.getItem("token");
}

export const getUser = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}