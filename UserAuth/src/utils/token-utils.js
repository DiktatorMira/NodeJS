import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, login: user.login }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, login: user.login }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};