import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../assets/Dashboard.css';
import { URL_BASE } from '../constants/constants';
import Navbar from './navbar';

interface Todo {
    id: string;
    title: string;
    description: string;
    userId: number
}

const Dashboard: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userToken") == null || !localStorage.getItem("userToken")) {
            navigate("/Login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${URL_BASE}/todos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTodos(response.data);
            } catch (error) {
                localStorage.clear();
                console.error('Error fetching todos', error);
            }
        };
        fetchTodos();
    }, [todos]);

    return (
        <div>
            <Navbar />
            <div className="dashboard-content">
                <h1>Welcome to Dashboard</h1>
                <p style={{textAlign: 'center'}}>
                    Welcome to the todo app dashboard, here you can check all todos, the id of the user who created those, and it's respective actions
                </p>
                <h2>Todo List</h2>
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.userId}</td>
                                <td style={{ display: 'none' }}>{todo.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
