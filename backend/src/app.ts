import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import todoRouter from './routes/todo';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(todoRouter, authRouter);

export default app;
