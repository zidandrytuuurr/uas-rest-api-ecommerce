const db = require("../config/db");


exports.checkout = (req, res) => {
  const userId = req.user.id;

  const sql = `
    INSERT INTO orders (user_id, total)
    VALUES (?, 0)
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json({
      message: "Checkout berhasil",
      order_id: result.insertId
    });
  });
};

exports.getMyOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT id, total, created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
};

exports.getOrderDetail = (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  const sql = `
    SELECT 
      products.name,
      products.price,
      order_items.quantity
    FROM order_items
    JOIN products ON order_items.product_id = products.id
    JOIN orders ON order_items.order_id = orders.id
    WHERE order_items.order_id = ?
      AND orders.user_id = ?
  `;

  db.query(sql, [orderId, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json(results);
  });
};

exports.getAllOrders = (req, res) => {
  const sql = `
    SELECT 
      o.id AS order_id,
      u.name AS user_name,
      u.email,
      o.total,
      o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
};

exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json({ message: "Status order berhasil diupdate" });
  });
};

exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;

  const sql = "DELETE FROM orders WHERE id = ?";

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json({ message: "Order berhasil dihapus" });
  });
};

exports.getAdminSummary = (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS total_orders,
      SUM(total) AS total_revenue
    FROM orders
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results[0]);
  });
};

