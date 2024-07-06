import express from 'express';

import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todo';

const router = express.Router();

router.get('/api/todos', getTodos);
router.get('/api/todos/:id', getTodoById);
router.post('/api/todos/create', createTodo);
router.put('/api/todos/:id', updateTodo);
router.delete('/api/todos/:id', deleteTodo);

export default router;