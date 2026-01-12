import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        roleId: user.roleId,
    },
    JWT_SECRET,
    { expiresIn: "8h" }
);
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};