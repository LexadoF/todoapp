import { Request, Response } from 'express';
import { AppDataSource } from '../constants/data-source';
import { Users } from '../models/users';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/jwtHelper';

export const login = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOneBy({ username: userName });
        if (!user || user === null) return res.status(400).json({ message: 'Invalid credentials' });
        const hasValidPass = await bcrypt.compare(password, user.password);
        if (!hasValidPass) return res.status(400).json({ message: 'Invalid credentials' });

        const token = await generateToken(user);

        return res.status(200).json({ token: token });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}