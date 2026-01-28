const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Ini data user (protected)",
    user: req.user, // dari token
  });
});

module.exports = router;