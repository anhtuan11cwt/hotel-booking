import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Đã gửi form đăng ký:", formData);

    setTimeout(() => {
      setUser({ email: formData.email, name: formData.name });
      toast.success("Đăng ký thành công!");
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50">
      <form
        className="sm:w-[400px] w-full bg-white rounded-2xl px-8 py-10 shadow-lg border border-gray-100"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-900 text-3xl font-semibold text-center">
          Đăng ký
        </h1>
        <p className="text-gray-500 text-sm mt-2 text-center">
          Tạo tài khoản để bắt đầu
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden pl-4 gap-3 focus-within:border-[#FF6347] focus-within:ring-2 focus-within:ring-[#FF6347]/20 transition-all">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              className="flex-1 border-none outline-none ring-0 text-gray-700 placeholder-gray-400"
              name="name"
              onChange={handleChange}
              placeholder="Họ và tên"
              required
              type="text"
              value={formData.name}
            />
          </div>

          <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden pl-4 gap-3 focus-within:border-[#FF6347] focus-within:ring-2 focus-within:ring-[#FF6347]/20 transition-all">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              className="flex-1 border-none outline-none ring-0 text-gray-700 placeholder-gray-400"
              name="email"
              onChange={handleChange}
              placeholder="Email của bạn"
              required
              type="email"
              value={formData.email}
            />
          </div>

          <div className="flex items-center w-full bg-white border border-gray-200 h-12 rounded-full overflow-hidden pl-4 pr-2 gap-3 focus-within:border-[#FF6347] focus-within:ring-2 focus-within:ring-[#FF6347]/20 transition-all">
            <Lock className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              className="flex-1 border-none outline-none ring-0 text-gray-700 placeholder-gray-400"
              name="password"
              onChange={handleChange}
              placeholder="Mật khẩu"
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
            />
            <button
              aria-label={showPassword ? "Ẩn mật khẩu" : "Xem mật khẩu"}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6347]/40 rounded-full"
              onClick={() => setShowPassword((v) => !v)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          className="mt-8 w-full h-12 rounded-full text-white bg-[#FF6347] hover:bg-[#e5533d] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Đăng ký
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Đã có tài khoản?{" "}
          <Link
            className="text-[#FF6347] hover:underline font-medium"
            to="/login"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
