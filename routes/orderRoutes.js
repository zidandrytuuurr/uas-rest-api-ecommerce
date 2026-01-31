const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/orders", authMiddleware, orderController.checkout);
router.get("/orders", authMiddleware, orderController.getMyOrders);
router.get("/orders/:id", authMiddleware, orderController.getOrderDetail);

router.get(
  "/admin/orders/:id",
  authMiddleware,
  isAdmin,
  orderController.getOrderDetail
);

router.get(
  "/order-items/:orderId",
  orderController.getOrderItems
);

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
  "/admin/Summary",
  authMiddleware,
  isAdmin,
  orderController.getAdminSummary
);


module.exports = router;