require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api", orderRoutes);
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
  res.send("API berjalan");
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
