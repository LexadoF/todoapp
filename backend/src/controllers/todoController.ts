import { Request, Response } from 'express';
import { AppDataSource } from '../constants/data-source';
import { Todo } from '../models/todo';
import { CreateTodoRequest, UpdateTodoRequest } from '../interfaces/todos';
import { AuthRequest } from '../interfaces/auth';

export const getTodos = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find();
    return res.status(200).json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo);
        const idToSearch: number = parseInt(req.body.id, 10);
        if (isNaN(idToSearch)) return res.status(400).json({ message: 'Id should be provided and should be a number' });
        const todo = await todoRepository.findOneBy({ id: idToSearch });
        if (todo) {
            return res.status(200).json(todo);
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
};

export const createTodo = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body as CreateTodoRequest;
        if (title === undefined) return res.status(400).json({ message: 'Missign title' });
        const todoRepository = new Todo();
        todoRepository.title = title;
        todoRepository.description = description || "";
        todoRepository.completed = false;
        todoRepository.userId = req.user?.id!;
        await AppDataSource.manager.insert(Todo, todoRepository);
        return res.status(201).json({ message: 'Todo Created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json('internal server error');
    }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo);
        const idToUpdate: number = parseInt(req.params.id, 10);

        const todo = await todoRepository.findOne({
            where: { id: idToUpdate },
            relations: ['user']
        });

        if (!todo) return res.status(404).json({ message: "Todo not found" });
        if (todo?.userId !== req.user?.id!) return res.status(403).json({ message: `You can't update this todo` });

        const { title, description, completed } = req.body as UpdateTodoRequest;

        if (title === undefined && description === undefined && completed === undefined) return res.status(400).json({ message: 'At least one of the properties (title, description, completed) must be provided.' });

        const allowedProperties = ['title', 'description', 'completed'];

        const extraProperties = Object.keys(req.body).filter(key => !allowedProperties.includes(key));

        if (extraProperties.length > 0) return res.status(400).json({ message: `Unexpected properties: ${extraProperties.join(', ')}` });

        const result = await todoRepository.update(idToUpdate, { title, description, completed });

        if (result.affected === 0) return res.status(404).json({ message: "Todo not found" });

        const updatedTodo = await todoRepository.findOneBy({ id: idToUpdate });
        return res.status(200).json(updatedTodo);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo);
        const todoToDelete: number = parseInt(req.params.id, 10);
        if (isNaN(todoToDelete)) return res.status(400).json({ message: 'Id should be provided and should be a number' });

        const todo = await todoRepository.findOne({
            where: { id: todoToDelete },
            relations: ['user']
        });
        
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        if (todo?.userId !== req.user?.id!) return res.status(403).json({ message: `You can't delete this todo` });

        const result = await todoRepository.delete(todoToDelete);

        if (result.affected) {
            return res.status(204).json({ message: 'Deleted succesfully' });
        } else {
            return res.status(400).json({ message: "Bad request" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};