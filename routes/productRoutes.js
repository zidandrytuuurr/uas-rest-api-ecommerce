const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);

router.post("/products", authMiddleware, isAdmin, productController.createProduct);
router.put("/products/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/products/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;