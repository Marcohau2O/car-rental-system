import { registerPublicUser, loginService } from "../services/auth.service.js";

export const register = async (req, res) => {
    const user = await registerPublicUser(req.body);
    res.status(201).json(user);
};

// export const createUserByAdmin = async (req, res) => {
//     const user = await adminCreateUser(req.body, req.user.id);
//     res.status(201).json(user);
// };

export const login = async (req, res) => {
    const result = await loginService(req.body);
    res.json(result);
};