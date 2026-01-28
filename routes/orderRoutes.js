const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/checkout", authMiddleware, orderController.checkout);
router.get("/orders", authMiddleware, orderController.getMyOrders);
router.get("/orders/:id", authMiddleware, orderController.getOrderDetail);

router.put(
  "/admin/orders/:id/status",
  authMiddleware,
  isAdmin,
  orderController.updateOrderStatus
);

router.get(
  "/admin/orders",
  authMiddleware,
  isAdmin,
  orderController.getAllOrders
);

router.delete(
  "/admin/orders/:id",
  authMiddleware,
  isAdmin,
  orderController.deleteOrder
);

router.get(
  "/admin/dashboard",
  authMiddleware,
  isAdmin,
  orderController.getAdminSummary
);

module.exports = router;