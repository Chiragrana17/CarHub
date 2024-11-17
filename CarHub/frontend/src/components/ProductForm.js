import React, { useState } from "react";
import { createProduct } from "../api"; // Assume API handles product creation
import { useNavigate } from "react-router-dom";

function ProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        Array.from(images).forEach((image) => formData.append("images", image));

        try {
            await createProduct(formData, token);
            navigate("/products"); // Redirect to the product listing page
        } catch (err) {
            console.log("Error creating product:", err);
        }
    };

    return ( <
        div className = "min-h-screen bg-gray-100 flex flex-col items-center py-10" >
        <
        h2 className = "text-3xl font-bold text-gray-800 mb-8" > { " " }
        Add New Product { " " } <
        /h2>{" "} <
        form onSubmit = { handleSubmit }
        className = "bg-white shadow-lg rounded-lg w-full max-w-lg p-6 space-y-6" >
        <
        div >
        <
        label className = "block text-gray-700 font-medium mb-2" >
        Product Title { " " } <
        /label>{" "} <
        input type = "text"
        placeholder = "Enter product title"
        value = { title }
        onChange = {
            (e) => setTitle(e.target.value) }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-gray-700 font-medium mb-2" >
        Product Description { " " } <
        /label>{" "} <
        textarea placeholder = "Enter product description"
        value = { description }
        onChange = {
            (e) => setDescription(e.target.value) }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows = "4"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-gray-700 font-medium mb-2" >
        Tags(comma separated) { " " } <
        /label>{" "} <
        input type = "text"
        placeholder = "e.g., electronics, gadgets"
        value = { tags }
        onChange = {
            (e) => setTags(e.target.value) }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
        >
        <
        /div>{" "} <
        div >
        <
        label className = "block text-gray-700 font-medium mb-2" >
        Upload Images { " " } <
        /label>{" "} <
        input type = "file"
        multiple onChange = { handleImageChange }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required /
        >
        <
        /div>{" "} <
        div >
        <
        button type = "submit"
        className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300" >
        Submit { " " } <
        /button>{" "} <
        /div>{" "} <
        /form>{" "} <
        /div>
    );
}

export default ProductForm;