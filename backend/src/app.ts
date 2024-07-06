import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(todoRoutes);

export default app;
