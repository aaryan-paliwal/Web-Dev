module.exports = function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  };
};

