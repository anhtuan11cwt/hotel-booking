import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 pb-6 w-full text-gray-500 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-8">
        <div className="md:max-w-96">
          <Link className="flex items-center gap-2" to="/">
            <img alt="Hotel Booking" className="h-10" src={assets.logo} />
          </Link>
          <p className="mt-6 text-sm leading-relaxed">
            Đặt phòng khách sạn dễ dàng và nhanh chóng với hàng ngàn lựa chọn
            khách sạn, resort sang trọng trên khắp Việt Nam. Trải nghiệm dịch vụ
            đặt phòng tiện lợi, an toàn và đáng tin cậy.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-12 md:gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Công ty</h2>
            <ul className="text-sm space-y-3">
              <li>
                <Link className="hover:text-[#FF6347] transition-colors" to="/">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FF6347] transition-colors"
                  to="/about"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FF6347] transition-colors"
                  to="/hotels"
                >
                  Khách sạn
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FF6347] transition-colors"
                  to="/privacy-policy"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Liên hệ</h2>
            <div className="text-sm space-y-3">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +84 123 456 789
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@hotelbooking.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Hà Nội, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-6 text-center text-xs md:text-sm text-gray-400">
        © 2026 Hotel Booking. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
