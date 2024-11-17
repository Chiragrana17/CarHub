const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const productRoutes = require("./routes/cars");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// MongoDB Connection
mongoose
    .connect(mongodb+srv://chirag:chirag@cluster0.ejue6.mongodb.net/, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Start the server
const PORT = https://carhub-3-3c5y.onrender.com;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
