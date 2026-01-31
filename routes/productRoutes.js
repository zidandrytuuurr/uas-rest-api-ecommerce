const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const productController = require("../controllers/productController");

// ✅ GET semua produk
router.get("/products", productController.getProducts);

// ✅ GET produk by ID (INI YANG KURANG)
router.get("/products/:id", productController.getProductById);

// 🔐 Admin only
router.post("/products", authMiddleware, isAdmin, productController.createProduct);
router.put("/products/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/products/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
