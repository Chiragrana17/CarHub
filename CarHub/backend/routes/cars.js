const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Car");

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// CRUD Endpoints

// Create a new product
router.post(
    "/",
    authMiddleware,
    upload.array("images", 10),
    async(req, res) => {
        const { title, description, tags } = req.body;
        const images = req.files.map((file) => `uploads/${file.filename}`);

        try {
            const product = await Product.create({
                title,
                description,
                tags,
                images,
                user: req.user.id,
            });
            res.status(201).json(product);
        } catch (err) {
            console.error("Error creating product:", err);
            res.status(500).json({ message: "Error creating product" });
        }
    }
);

// Get all products for the logged-in user
router.get("/", authMiddleware, async(req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Get a specific product by ID
router.get("/:id", authMiddleware, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Error fetching product" });
    }
});

// Update a product
router.put(
    "/:id",
    authMiddleware,
    upload.array("images", 10),
    async(req, res) => {
        const { title, description, tags } = req.body;
        const images = req.files.map((file) => `uploads/${file.filename}`);

        try {
            const product = await Product.findById(req.params.id);
            if (!product || product.user.toString() !== req.user.id) {
                return res.status(404).json({ message: "Product not found" });
            }

            product.title = title || product.title;
            product.description = description || product.description;
            product.tags = tags || product.tags;
            if (images.length) product.images = images;

            await product.save();
            res.json(product);
        } catch (err) {
            console.error("Error updating product:", err);
            res.status(500).json({ message: "Error updating product" });
        }
    }
);

// Delete a product
router.delete("/:id", authMiddleware, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete images from the server
        product.images.forEach((image) => {
            const imagePath = path.join(__dirname, "..", image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the image
            }
        });

        // Use `deleteOne()` for the product
        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res
            .status(500)
            .json({ message: "Error deleting product", error: err.message });
    }
});

module.exports = router;