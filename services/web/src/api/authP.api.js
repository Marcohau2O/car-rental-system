import api from "./axios";

export const loginRequestPublic = (payload) => {
    return api.post("/auth/loginPublic", payload)
}

export const registerRequestPublic = (payload) => {
  return api.post("/auth/registerPublic", payload)
}