const db = require("../config/db");

exports.createProduct = (req, res) => {
  const { name, price, stock, description } = req.body;

  const sql =
    "INSERT INTO products (name, price, stock, description) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, price, stock, description], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal menambahkan product",
        error: err,
      });
    }

    res.json({
      message: "Product berhasil ditambahkan",
      product_id: result.insertId,
    });
  });
};


exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil products",
        error: err,
      });
    }

    res.json(results);
  });
};


exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, stock=?, description=? WHERE id=?";

  db.query(sql, [name, price, stock, description, id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal update product",
        error: err,
      });
    }

    res.json({ message: "Product berhasil diupdate" });
  });
};


exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal hapus product",
        error: err,
      });
    }

    res.json({ message: "Product berhasil dihapus" });
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;

  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, [productId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'DB error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(results[0]);
  });
};
