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

exports.getOrderItems = (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
    SELECT
      oi.id,
      oi.order_id,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name AS product_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({
      order_id: orderId,
      items: results
    });
  });
};

exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  console.log("ORDER ID DARI URL:", orderId);
  console.log("USER ID DARI TOKEN:", userId);

  const sql = `
    SELECT *
    FROM orders
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [orderId, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json(results[0]);
  });
};

exports.createOrder = (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  db.query(
    `INSERT INTO orders (user_id) VALUES (?)`,
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const orderId = result.insertId;

      items.forEach(item => {
        db.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.price]
        );
      });

      res.json({ message: "Checkout berhasil", order_id: orderId });
    }
  );
};

exports.getCartByUserId = (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT c.product_id, p.name, p.price, c.quantity
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getAllOrders = (req, res) => {
  const sql = `
    SELECT o.*, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getOrderByIdAdmin = (req, res) => {
  const orderId = req.params.id;

  const sql = `
    SELECT o.*, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json(results[0]);
  });
};
