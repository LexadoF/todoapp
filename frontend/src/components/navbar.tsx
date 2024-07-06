import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar: React.FC = () => {
    const userName = localStorage.getItem('userName') || '';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Todo App</div>
            <div className="navbar-menu">
                <div className="navbar-dropdown">
                    <button className="navbar-btn">Todo</button>
                    <div className="navbar-dropdown-content">
                        <Link to="/dashboard" className="navbar-dropdown-item">
                            Todo List
                        </Link>
                        <Link to="/create-todo" className="navbar-dropdown-item">
                            Create Todo
                        </Link>
                    </div>
                </div>
                <div className="navbar-user">
                    Welcome <strong>{userName}</strong>
                    <button className="navbar-logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;