import {
  BedDouble,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const OwnerLayout = () => {
  const { setOwner } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const iconClassName = "w-5 h-5";

  const sidebarLinks = [
    {
      icon: <LayoutDashboard aria-hidden="true" className={iconClassName} />,
      name: "Tổng quan",
      path: "/owner",
    },
    {
      icon: <PlusCircle aria-hidden="true" className={iconClassName} />,
      name: "Đăng ký KS",
      path: "/owner/register-hotel",
    },
    {
      icon: <BedDouble aria-hidden="true" className={iconClassName} />,
      name: "Phòng",
      path: "/owner/rooms",
    },
    {
      icon: <CalendarDays aria-hidden="true" className={iconClassName} />,
      name: "Đặt phòng",
      path: "/owner/bookings",
    },
  ];

  const handleLogout = () => {
    setOwner(null);
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/owner") {
      return location.pathname === "/owner";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 border-r border-gray-300 flex flex-col bg-white">
        <div className="px-4 md:px-8 border-b border-gray-300 py-4">
          <Link to="/">
            <img alt="Logo" className="h-9" src={assets.logo} />
          </Link>
        </div>

        <div className="flex-1 pt-4">
          {sidebarLinks.map((item) => (
            <Link
              className={`flex items-center py-3 px-4 gap-3 transition-all duration-200 ${
                isActive(item.path)
                  ? "border-r-4 md:border-r-[6px] bg-[#FF6347]/10 border-[#FF6347] text-[#FF6347]"
                  : "hover:bg-gray-100 border-transparent text-gray-700"
              }`}
              key={item.path}
              to={item.path}
            >
              {item.icon}
              <span className="md:block hidden text-sm font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-300">
          <button
            className="flex items-center gap-3 w-full py-2 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            onClick={handleLogout}
            type="button"
          >
            <LogOut aria-hidden="true" className={iconClassName} />
            <span className="md:block hidden text-sm font-medium">
              Đăng xuất
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;
