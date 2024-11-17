import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.data.token); // Store token in localStorage
            navigate("/products"); // Redirect to Product List Page
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return ( <
        div className = "flex items-center justify-center min-h-screen bg-gray-100" >
        <
        div className = "w-full max-w-md bg-white rounded-lg shadow-lg p-8" >
        <
        h2 className = "text-2xl font-bold text-center text-gray-700 mb-4" >
        Login { " " } <
        /h2>{" "} <
        form onSubmit = { handleSubmit }
        className = "space-y-4" >
        <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        required className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /
        >
        <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        required className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /
        >
        <
        button type = "submit"
        className = "w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200" >
        Login { " " } <
        /button>{" "} <
        /form>{" "} {
            error && < p className = "text-red-500 mt-4 text-center" > { error } < /p>}{" "} <
                /div>{" "} <
                /div>
        );
    }

    export default Login;