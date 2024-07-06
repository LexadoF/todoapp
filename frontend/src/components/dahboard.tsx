import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userToken") == null || !localStorage.getItem("userToken")) {
            navigate("/Login");
        }
    }, [navigate]);
    
    return (
        <div>
            <Navbar />
            <div>
                <h1>Welcome to Dashboard</h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi aut iure velit
                    voluptatem recusandae suscipit fuga nam nemo quam ratione eligendi deserunt
                    excepturi quos adipisci, dolorum veniam perspiciatis sed esse.
                </p>
            </div>
        </div>

    );
};

export default Dashboard;
