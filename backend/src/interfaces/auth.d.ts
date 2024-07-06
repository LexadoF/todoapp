import { Request } from "express";
import { Users } from "../models/users";

export interface AuthRequest extends Request {
    user?: Users;
}