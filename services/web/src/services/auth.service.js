import { loginRequestPublic, registerRequestPublic } from "../api/authP.api";

export const loginRequestP = async (credenciales) => {
    const { data } = await loginRequestPublic(credenciales);

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    return data
};

export const registerRequestP = async (payload) => {
  const { data } = await registerRequestPublic(payload)
  return data
}

export const logout = () => {
    sessionStorage.clear()
}