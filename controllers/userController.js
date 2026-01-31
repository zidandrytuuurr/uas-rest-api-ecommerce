const db = require("../config/db");

exports.getAllUsers = (req, res) => {
  const sql = "SELECT id, name, email, role FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB error", error: err });
    }
    res.json(results);
  });
};
