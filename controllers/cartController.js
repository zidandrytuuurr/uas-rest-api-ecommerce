const db = require("../config/db");

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  const sql = `
    INSERT INTO carts (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, product_id, quantity], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json({
      message: "Produk berhasil masuk cart",
    });
  });
};
exports.getMyCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT c.id, p.name, p.price, c.quantity
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json({
      cart: results
    });
  });
};
exports.getMyCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT c.id, p.name, p.price, c.quantity
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json({
      cart: results
    });
  });
};
