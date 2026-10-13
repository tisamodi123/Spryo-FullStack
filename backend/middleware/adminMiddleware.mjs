// backend/middleware/adminMiddleware.mjs
const adminMiddleware = (req, res, next) => {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@gmail.com").toLowerCase();
  const userEmail = (req.user?.email || "").toLowerCase();

  if (!req.user || req.user.role !== "admin" || userEmail !== adminEmail) {
    return res.status(403).json({
      success: false,
      forbidden: true,
      message: "403 Forbidden: Administrator privileges strictly restricted to authorized system admin."
    });
  }
  next();
};

export default adminMiddleware;
