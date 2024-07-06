import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userToken") == null || !localStorage.getItem("userToken")) {
            navigate("/Login");
        }
    }, [navigate]);
    
    return (
        <div>
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi aut iure velit voluptatem recusandae suscipit fuga nam nemo quam ratione eligendi deserunt excepturi quos adipisci, dolorum veniam perspiciatis sed esse.</h1>
        </div>
    );
};

export default Dashboard;
