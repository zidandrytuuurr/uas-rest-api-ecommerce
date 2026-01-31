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

exports.getCartByUserId = (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT 
      c.id AS cart_id,
      p.id AS product_id,
      p.name,
      p.price,
      c.quantity
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "DB error",
        error: err
      });
    }

    res.json({
      user_id: userId,
      items: results
    });
  });
};

exports.updateCartQuantity = (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  const { quantity } = req.body;

  const sql = `
    UPDATE carts
    SET quantity = ?
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(sql, [quantity, userId, productId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item cart tidak ditemukan" });
    }

    res.json({ message: "Quantity cart berhasil diupdate" });
  });
};

exports.deleteCartItem = (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const sql = `
    DELETE FROM carts
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(sql, [userId, productId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item cart tidak ditemukan" });
    }

    res.json({ message: "Item berhasil dihapus dari cart" });
  });
};
