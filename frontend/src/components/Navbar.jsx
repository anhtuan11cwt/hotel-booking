import { Calendar, LogOut, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, owner, setUser, setOwner, axios, navigate } =
    useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Khách sạn", path: "/hotels" },
    { name: "Phòng", path: "/rooms" },
    { name: "Giới thiệu", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
    } catch {
      // Continue with logout even if API fails
    }
    setUser(false);
    setOwner(false);
    setIsDropdownOpen(false);
    navigate("/");
    toast.success("Đăng xuất thành công!");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/95 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "bg-[#FF6347] py-4 md:py-6"
      }`}
    >
      <Link className="flex items-center gap-2" to="/">
        <img
          alt="Đặt phòng khách sạn"
          className={`h-10 transition-all duration-500 ${
            isScrolled ? "opacity-90" : "brightness-0 invert"
          }`}
          src={assets.logo}
        />
      </Link>

      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700 hover:text-[#FF6347]" : "text-white"
            } transition-colors duration-300`}
            key={link.path}
            to={link.path}
          >
            {link.name}
            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                isScrolled ? "bg-[#FF6347]" : "bg-white"
              }`}
            />
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        {user || owner ? (
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
            >
              <img
                alt={user?.name || owner?.name || "Người dùng"}
                className={`w-9 h-9 rounded-full object-cover border-2 ${
                  isScrolled ? "border-[#FF6347]" : "border-white"
                }`}
                src={assets.profile_icon || assets.user_icon}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                  to="/my-bookings"
                >
                  <Calendar className="w-4 h-4" />
                  Đặt phòng của tôi
                </Link>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              isScrolled
                ? "bg-[#FF6347] text-white hover:bg-[#e5533d]"
                : "bg-white text-[#FF6347] hover:bg-gray-100"
            }`}
            to="/login"
          >
            Đăng nhập
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3 md:hidden">
        {(user || owner) && (
          <Link to="/my-bookings">
            <img
              alt={user?.name || owner?.name || "Người dùng"}
              className="w-8 h-8 rounded-full object-cover"
              src={assets.profile_icon || assets.user_icon}
            />
          </Link>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button">
          {isMenuOpen ? (
            <X
              className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`}
            />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
          type="button"
        >
          <X className="h-6 w-6" />
        </button>

        {navLinks.map((link) => (
          <Link
            className="text-lg"
            key={link.path}
            onClick={() => setIsMenuOpen(false)}
            to={link.path}
          >
            {link.name}
          </Link>
        ))}

        {user || owner ? (
          <button
            className="text-lg text-[#FF6347]"
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            type="button"
          >
            Đăng xuất
          </button>
        ) : (
          <Link
            className="bg-[#FF6347] text-white px-8 py-2.5 rounded-full"
            onClick={() => setIsMenuOpen(false)}
            to="/login"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
