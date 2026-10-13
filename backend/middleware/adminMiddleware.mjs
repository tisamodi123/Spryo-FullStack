// backend/middleware/adminMiddleware.mjs
const adminMiddleware = (req, res, next) => {
  if (
    !req.user ||
    (req.user.role !== "admin" && req.user.email !== "admin@gmail.com")
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access denied. Please login with an admin account."
    });
  }
  next();
};

export default adminMiddleware;
