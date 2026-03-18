export const isOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Không được phép",
      success: false,
    });
  }

  if (req.user.role !== "owner") {
    return res.status(403).json({
      message: "Không được phép - Chỉ chủ khách sạn mới có quyền truy cập",
      success: false,
    });
  }

  next();
};
