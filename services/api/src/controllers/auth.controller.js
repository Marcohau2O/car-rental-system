import { registerPublicUser, loginPublicUser, loginService } from "../services/auth.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const registerPublic = asyncHandler(async (req, res) => {
    const user = await registerPublicUser(req.body);
    res.status(201).json(user);
});

export const loginPublic = asyncHandler(async (req, res) => {
    const result = await loginPublicUser(req.body);
    res.json(result);
});
// export const createUserByAdmin = async (req, res) => {
//     const user = await adminCreateUser(req.body, req.user.id);
//     res.status(201).json(user);
// };

export const login = asyncHandler(async (req, res) => {
    const result = await loginService(req.body);
    res.json(result);
});