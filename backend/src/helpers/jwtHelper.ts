import Jwt from "jsonwebtoken";
import { jwtSecret } from "../constants/enviromentalSettings";
import { Users } from "../models/users";

export const generateToken = async (user: Users) => {
    const token = Jwt.sign(
        {
            id: user.id,
        },
        jwtSecret,
        {
            expiresIn: "24h",
        }
    );

    return token;
}

export const verifyToken = async (token: string) => {
    return Jwt.verify(token, jwtSecret);
}