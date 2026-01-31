const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const userController = require("../controllers/userController");

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Ini data user (protected)",
      user: req.user,
    });
  }
);

router.get(
  "/users",
  authMiddleware,
  isAdmin,
  userController.getAllUsers
);

module.exports = router;
