import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from 'axios';
import '../assets/Dashboard.css';
import { URL_BASE } from '../constants/constants';
import Navbar from './navbar';
import Swal from 'sweetalert2';

interface Todo {
    id: string;
    title: string;
    completed: number;
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
                console.error('Error fetching todos', error);
            }
        };
        fetchTodos();
    }, [todos]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('userToken');
                await axios.delete(`${URL_BASE}/todos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                await Swal.fire({
                    title: 'Deleted',
                    text: 'Your todo has been deleted.',
                    icon: 'success'
                });
                setTodos(todos.filter(todo => todo.id !== id));
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.status == 403) {
                        await Swal.fire({
                            title: 'Error',
                            text: "You can't delete this todo since you are not the owner of it",
                            icon: 'error'
                        });
                    }
                }
            }
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit-todo/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard-content">
                <h1>Welcome to Dashboard</h1>
                <p style={{ textAlign: 'center' }}>
                    Welcome to the todo app dashboard, here you can check all todos, the id of the user who created those, and it's respective actions
                </p>
                <h2>Todo List</h2>
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Completed</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'Yes' : 'No'}</td>
                                <td>{todo.userId}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEdit(todo.id)}>Edit</button>
                                    <button className='delete-btn' onClick={() => handleDelete(todo.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
