import React, { useEffect, useState } from "react";
import { listProducts } from "../api";
import { useNavigate } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const response = await listProducts(token);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [token]);

    const handleCreate = () => {
        navigate("/product/create");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signup");
    };

    // Filter products based on the search query
    const filteredProducts = products.filter(
        (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return ( <
        div className = "min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center" > { " " } { /* Header Section */ } { " " } <
        div className = "w-full max-w-6xl flex justify-between items-center py-4 px-6" >
        <
        h2 className = "text-3xl font-bold" > Your Cars < /h2>{" "} <
        button onClick = { handleLogout }
        className = "bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300" >
        Logout { " " } <
        /button>{" "} <
        /div>{" "} { /* Search Bar */ } { " " } <
        div className = "w-full max-w-6xl mt-4 px-6" >
        <
        input type = "text"
        placeholder = "Search cars by title or description..."
        value = { searchQuery }
        onChange = {
            (e) => setSearchQuery(e.target.value) }
        className = "w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" /
        >
        <
        /div>{" "} { /* Product List Section */ } { " " } <
        div className = "w-full max-w-6xl mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4" > { " " } {
            filteredProducts.map((product) => ( <
                div key = { product._id }
                className = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" >
                {
                    product.images && product.images.length > 0 && ( <
                        img src = "https://www.shutterstock.com/image-vector/car-icons-vintage-cars-unique-600nw-2443917033.jpg"
                        alt = { product.title }
                        className = "w-full h-48 object-cover" /
                        >
                    )
                } { " " } <
                div className = "p-4" >
                <
                h3 className = "text-xl font-semibold" > { product.title } < /h3>{" "} <
                p className = "text-gray-600 mt-2" > { product.description } < /p>{" "} <
                button onClick = {
                    () => navigate(`/product/${product._id}`) }
                className = "mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300" >
                View Details { " " } <
                /button>{" "} <
                /div>{" "} <
                /div>
            ))
        } { " " } <
        /div>{" "} { /* Create Product Button */ } { " " } <
        button onClick = { handleCreate }
        className = "mt-10 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300" >
        Create New Car { " " } <
        /button>{" "} <
        /div>
    );
}

export default ProductList;