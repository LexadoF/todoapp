import express from 'express';
import { login } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/api/login', login);

export default authRouter;