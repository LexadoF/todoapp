import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/EditTodo.css';
import { URL_BASE } from '../constants/constants';
import Navbar from './navbar';

interface Todo {
    id: string;
    title: string;
    description: string;
    userId: number;
}

const EditTodo: React.FC = () => {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [completed, setCompleted] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    useEffect(() => {
        if (localStorage.getItem("userToken") == null || !localStorage.getItem("userToken")) {
            navigate("/Login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${URL_BASE}/todos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.data.userId !== userId) {
                    navigate('/dashboard');
                } else {
                    setTodo(response.data);
                    setTitle(response.data.title);
                    setCompleted(response.data.completed);
                    setDescription(response.data.description);
                }
            } catch (error) {
                console.error('Error fetching todo', error);
                navigate('/dashboard');
            }
        };
        fetchTodo();
    }, [id, navigate, userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            await axios.put(`${URL_BASE}/todos/${id}`, {
                title,
                description,
                completed
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to update todo');
            console.error('Error updating todo', error);
        }
    };

    if (!todo) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="edit-todo-container">
                <h1>Edit Todo</h1>
                <form className="edit-todo-form" onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder='Write the title'
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Write a description (optional)'
                        ></textarea>
                    </label>
                    <label>
                        Completed:
                        <select value={completed ? 'yes' : 'no'} onChange={(e) => setCompleted(e.target.value === 'yes')}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </label>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Update Todo</button>
                </form>
            </div>
        </div>
    );
};

export default EditTodo;
