import express from 'express';

import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';
import { checkAuth } from '../middlewares/authMiddleware';

const todoRouter = express.Router();

todoRouter.get('/api/todos', checkAuth, getTodos);
todoRouter.get('/api/todos/:id', checkAuth, getTodoById);
todoRouter.post('/api/todos/create', checkAuth, createTodo);
todoRouter.put('/api/todos/:id', checkAuth, updateTodo);
todoRouter.delete('/api/todos/:id', checkAuth, deleteTodo);

export default todoRouter;