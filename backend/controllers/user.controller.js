import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email đã được sử dụng",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      success: true,
      user: {
        email: newUser.email,
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch {
    res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập email và mật khẩu",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    res.json({
      message: "Đăng nhập thành công",
      success: true,
      user: {
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json({
      message: "Đăng xuất thành công",
      success: true,
    });
  } catch {
    res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

export const isAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Chưa đăng nhập",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch {
    res.status(401).json({
      message: "Token không hợp lệ",
      success: false,
    });
  }
};
