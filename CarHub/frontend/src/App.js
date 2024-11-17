import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProdeuctList";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/signup" element={<SignUp />} />{" "}
        <Route path="/products" element={<ProductList />} />{" "}
        <Route path="/product/create" element={<ProductForm />} />{" "}
        <Route path="/product/:id" element={<ProductDetails />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
