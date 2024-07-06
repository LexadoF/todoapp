import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../constants/data-source';
import { Users } from '../models/users';
import { AuthRequest } from '../interfaces/auth';
import { jwtSecret } from '../constants/enviromentalSettings';

export const checkAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const tokenFromReq = req.headers.authorization;
    const token = tokenFromReq?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Token Required' });
    }
    try {
        const decoded: any = jwt.verify(token, jwtSecret);
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: decoded.id });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};