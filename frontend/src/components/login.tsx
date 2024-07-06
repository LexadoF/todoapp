import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Login.css';
import { URL_BASE } from '../constants/constants';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL_BASE}/login`, {
                userName: username,
                password: password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Login successful');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <div className="loginSuper-container">
                <h1>Login</h1>
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                placeholder='username'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                placeholder='******'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
