module.exports = (req, res, next) => {
  
  console.log("ROLE DARI TOKEN:", req.user.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Akses admin saja"
    });
  }

  next();
};
