import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom"; // Updated import

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Updated for React Router v6

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signup(username, email, password);
            navigate("/login"); // Redirect to login page after successful signup
        } catch (err) {
            setError("Error creating account. Please try again.");
        }
    };

    const handle = () => {
        navigate("/login");
    };

    return ( <
        div className = "flex items-center justify-center min-h-screen bg-gray-100" >
        <
        div className = "w-full max-w-md bg-white rounded-lg shadow-lg p-8" >
        <
        h2 className = "text-2xl font-bold text-center text-gray-700 mb-4" >
        Sign Up { " " } <
        /h2>{" "} <
        form onSubmit = { handleSubmit }
        className = "space-y-4" >
        <
        input type = "text"
        placeholder = "Username"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        required className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /
        >
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
        Sign Up { " " } <
        /button>{" "} <
        /form>{" "} <
        div className = "mt-4 text-center" >
        <
        h5 className = "text-gray-600" > Already have an account ? < /h5>{" "} <
        button onClick = { handle }
        className = "text-blue-500 font-semibold hover:underline" >
        Login { " " } <
        /button>{" "} <
        /div>{" "} {
            error && < p className = "text-red-500 mt-4 text-center" > { error } < /p>}{" "} <
                /div>{" "} <
                /div>
        );
    }

    export default SignUp;