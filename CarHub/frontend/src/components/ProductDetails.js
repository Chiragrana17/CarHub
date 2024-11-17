import React, { useEffect, useState } from "react";
import { getProductDetails, updateProduct, deleteProduct } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProductDetails = async() => {
            try {
                const response = await getProductDetails(id, token);
                setProduct(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setTags(response.data.tags);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductDetails();
    }, [id, token]);

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
            await updateProduct(id, formData, token);
            navigate("/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async() => {
        try {
            await deleteProduct(id, token);
            navigate("/products");
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response);
            } else if (error.request) {
                console.error("Request error:", error.request);
            } else {
                console.error("Error", error.message);
            }
        }
    };

    return ( <
        div className = "min-h-screen bg-gray-100 flex flex-col items-center py-10" > { " " } {
            product ? ( <
                div className = "bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 space-y-6" >
                <
                h2 className = "text-3xl font-bold text-gray-800 mb-4" >
                Product Details { " " } <
                /h2>{" "} <
                form onSubmit = { handleSubmit }
                className = "space-y-4" >
                <
                div >
                <
                label className = "block text-gray-700 font-medium mb-2" >
                Title { " " } <
                /label>{" "} <
                input type = "text"
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
                Description { " " } <
                /label>{" "} <
                textarea value = { description }
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
                Tags { " " } <
                /label>{" "} <
                input type = "text"
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
                className = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                >
                <
                /div>{" "} <
                button type = "submit"
                className = "w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300" >
                Update Product { " " } <
                /button>{" "} <
                /form>{" "} <
                button onClick = { handleDelete }
                className = "w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300" >
                Delete Product { " " } <
                /button>{" "} { /* Displaying Product Images */ } { " " } <
                div className = "mt-6" > { " " } {
                    product.images.length > 0 ? ( <
                        div className = "grid grid-cols-2 gap-4" > { " " } {
                            product.images.map((image, index) => ( <
                                div key = { index }
                                className = "relative" >
                                <
                                img src = { `http://localhost:5000${image}` }
                                alt = { `Product Image ${index + 1}` }
                                className = "w-full h-auto rounded-lg" /
                                >
                                <
                                /div>
                            ))
                        } { " " } <
                        /div>
                    ) : ( <
                        p > No images available
                        for this product. < /p>
                    )
                } { " " } <
                /div>{" "} <
                /div>
            ) : ( <
                p className = "text-gray-500 text-lg" > Loading... < /p>
            )
        } { " " } <
        /div>
    );
}

export default ProductDetails;