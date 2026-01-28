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

module.exports = router;
