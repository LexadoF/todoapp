import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/CreateTodo.css';
import { URL_BASE } from '../constants/constants';
import Navbar from './navbar';

const CreateTodo: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            await axios.post(`${URL_BASE}/todos/create`, {
                title,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to create todo');
            console.error('Error creating todo', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-todo-container">
                <h1>Create Todo</h1>
                <form className="create-todo-form" onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            placeholder='Write the title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            placeholder='Write a description (optional)'
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Create Todo</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTodo;
