import request from 'supertest';
import { Todo } from '../models/todo';
import { Users } from '../models/users';
import bcrypt from 'bcrypt';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../constants/enviromentalSettings';
import { DataSource } from 'typeorm';
import app from '../app';

export const testDatasource = new DataSource({
    type: 'mysql',
    host: dbHost,
    port: dbPort || 3306,
    username: dbUser,
    password: dbPassword || '',
    database: `test_${dbName}`,
    synchronize: true,
    charset: 'utf8mb4',
    logging: false,
    entities: [
        Todo, Users
    ],
    migrations: [],
    subscribers: [],
    dropSchema: true
});

let token: any;
let userId: any;

beforeAll(async () => {
    await testDatasource.initialize();

    const userRepository = testDatasource.getRepository(Users);
    const user = new Users();
    user.username = 'testuser';
    user.password = await bcrypt.hash('password', 10);
    await userRepository.save(user);
    userId = user.id!;

    const response = await request(app)
        .post('/api/login')
        .send({ userName: 'testuser', password: 'password' });
    token = response.body.token;
});

afterAll(async () => {
    await testDatasource.destroy();
});

describe('Todo controller', () => {
    it('should create a new todo', async () => {
        console.log(token)
        const response = await request(app)
            .post('/api/todos/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Todo', description: 'Test description' });
        expect(response.status).toEqual(201);
        expect(response.body.message).toBe('Todo Created successfully');
    });

    it('should get all todos', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a todo by ID', async () => {
        const todoRepository = testDatasource.getRepository(Todo);
        const todo = new Todo();
        todo.title = 'Test Todo';
        todo.description = 'Test description';
        todo.userId = userId;
        await todoRepository.save(todo);

        const response = await request(app)
            .get(`/api/todos/${todo.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(todo.id);
    });

    it('should update a todo', async () => {
        const todoRepository = testDatasource.getRepository(Todo);
        const todo = new Todo();
        todo.title = 'Test Todo';
        todo.description = 'Test description';
        todo.userId = userId;
        await todoRepository.save(todo);

        const response = await request(app)
            .put(`/api/todos/${todo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Title');
    });

    it('should delete a todo', async () => {
        const todoRepository = testDatasource.getRepository(Todo);
        const todo = new Todo();
        todo.title = 'Test Todo';
        todo.description = 'Test description';
        todo.userId = userId;
        await todoRepository.save(todo);

        const response = await request(app)
            .delete(`/api/todos/${todo.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });
});