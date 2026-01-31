const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/cart",
  authMiddleware,
  cartController.addToCart
);

router.get(
  "/cart",
  authMiddleware,
  cartController.getMyCart
);

router.put(
  "/cart/:productId",
  authMiddleware,
  cartController.updateCartQuantity
);

router.delete(
  "/cart/:productId",
  authMiddleware,
  cartController.deleteCartItem
);

router.get(
  "/cart/:id",
  authMiddleware,
  cartController.getCartByUserId
);

router.get(
  "/cart/:id",
  authMiddleware,
  cartController.getCartByUserId
);

module.exports = router;
