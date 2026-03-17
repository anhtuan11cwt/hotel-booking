import add_icon from "./add_icon.png";
import calendar_icon from "./calendar_icon.png";
import camera_icon from "./camera_icon.png";
import dashboard_icon from "./dashboard_icon.png";
import delete_icon from "./delete_icon.png";
import edit_icon from "./edit_icon.png";
import freezer_icon from "./freezer_icon.png";
import hero_img from "./hero_img.png";
import location from "./location.png";
import location_icon from "./location_icon.png";
import logo from "./logo.png";
import profile_icon from "./profile_icon.png";
import user_icon from "./user_icon.png";
import users_icon from "./users_icon.png";

export const assets = {
  add_icon,
  calendar_icon,
  dashboard_icon,
  delete_icon,
  edit_icon,
  freezer_icon,
  hero_img,
  location,
  logo,
  profile_icon,
  user_icon,
};

export const cities = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Nha Trang",
  "Huế",
  "Hạ Long",
  "Sapa",
  "Phú Quốc",
  "Quy Nhơn",
];
export const homePageData = [
  {
    icon: users_icon,
    title: "Người dùng",
    value: "2500",
  },
  {
    icon: camera_icon,
    title: "Khách sạn",
    value: "400",
  },
  {
    icon: location_icon,
    title: "Thành phố",
    value: "200",
  },
];

export const hotelsData = [
  {
    address: "123 Đường Tràng Tiền, Hoàn Kiếm, Hà Nội",
    amenities: ["WiFi", "Hồ bơi", "Spa", "Nhà hàng"],
    contactNumber: "+84 (24) 3825-3888",
    id: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
    name: "Khách sạn Cung điện Hoàng gia",
    ownerName: "Nguyễn Văn A",
    price: "299.000 VNĐ",
    rating: 4.8,
  },
  {
    address: "456 Đường Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh",
    amenities: ["WiFi", "Bãi biển", "Hồ bơi", "Quán bar"],
    contactNumber: "+84 (28) 3822-8888",
    id: 2,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop",
    name: "Resort Nhìn ra Đại dương",
    ownerName: "Trần Thị B",
    price: "199.000 VNĐ",
    rating: 4.6,
  },
  {
    address: "789 Đường Trần Phú, Hải Châu, Đà Nẵng",
    amenities: ["WiFi", "Lò sưởi", "Trượt tuyết", "Nhà hàng"],
    contactNumber: "+84 (236) 3847-888",
    id: 3,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
    name: "Nhà nghỉ Núi",
    ownerName: "Phạm Văn C",
    price: "349.000 VNĐ",
    rating: 4.7,
  },
  {
    address: "321 Đường Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
    amenities: ["WiFi", "Trung tâm kinh doanh", "Phòng tập", "Bãi đỗ xe"],
    contactNumber: "+84 (24) 3933-5000",
    id: 4,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
    name: "Khách sạn Kinh doanh Trung tâm",
    ownerName: "Lê Thị D",
    price: "159.000 VNĐ",
    rating: 4.3,
  },
  {
    address: "567 Đường Võ Văn Kiệt, Quận 1, Thành phố Hồ Chí Minh",
    amenities: ["WiFi", "Tour lịch sử", "Vườn", "Nhà hàng"],
    contactNumber: "+84 (28) 3829-1111",
    id: 5,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
    name: "Khách sạn Boutique Lịch sử",
    ownerName: "Hoàng Văn E",
    price: "279.000 VNĐ",
    rating: 4.9,
  },
  {
    address: "890 Đường Bạch Đằng, Hải Phòng",
    amenities: ["WiFi", "Lễ tân", "Hồ bơi trên mái", "Dịch vụ xe"],
    contactNumber: "+84 (225) 3842-888",
    id: 6,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop",
    name: "Khách sạn Suites Thành phố Sang trọng",
    ownerName: "Đỗ Thị F",
    price: "399.000 VNĐ",
    rating: 4.5,
  },
];
export const roomsData = [
  {
    __v: 0,
    _id: "67f7647c197ac559e4089b96",
    amenities: ["Nhìn ra biển", "Ban công", "Minibar", "Dịch vụ phòng"],
    createdAt: "2025-04-10T06:26:04.013Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Deluxe của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn ra biển tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[0],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
    ],
    isAvailable: true,
    pricePerNight: 450000,
    roomType: "Phòng Deluxe",
    updatedAt: "2025-04-10T06:26:04.013Z",
  },
  {
    __v: 0,
    _id: "67f76452197ac559e4089b8e",
    amenities: [
      "Nhìn ra thành phố",
      "Bàn làm việc",
      "WiFi cao cấp",
      "Dịch vụ lễ tân",
    ],
    createdAt: "2025-04-10T06:25:22.593Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Hành động của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn ra thành phố tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[1],
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    ],
    isAvailable: true,
    pricePerNight: 350000,
    roomType: "Phòng Hành động",
    updatedAt: "2025-04-10T06:25:22.593Z",
  },
  {
    __v: 0,
    _id: "67f76406197ac559e4089b82",
    amenities: [
      "Nhìn ra núi",
      "WiFi miễn phí",
      "Bao gồm bữa sáng",
      "Bãi đỗ xe",
    ],
    createdAt: "2025-04-10T06:24:06.285Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Đôi Tiêu chuẩn của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn ra núi tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[2],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    ],
    isAvailable: true,
    pricePerNight: 280000,
    roomType: "Phòng Đôi Tiêu chuẩn",
    updatedAt: "2025-04-10T06:24:06.285Z",
  },
  {
    __v: 0,
    _id: "67f763d8197ac559e4089b7a",
    amenities: [
      "Nhìn ra vườn",
      "TV thông minh",
      "Dịch vụ phòng",
      "Tiếp cận Spa",
    ],
    createdAt: "2025-04-10T06:23:20.252Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Đơn cao cấp của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn ra vườn tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[3],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
    ],
    isAvailable: true,
    pricePerNight: 220000,
    roomType: "Phòng Đơn cao cấp",
    updatedAt: "2025-04-10T06:23:20.252Z",
  },
  {
    __v: 0,
    _id: "67f763a1197ac559e4089b72",
    amenities: ["Tiếp cận hồ bơi", "Bếp", "Phòng khách", "Bữa sáng miễn phí"],
    createdAt: "2025-04-10T06:22:25.185Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Gia đình của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn ra biển tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[4],
    images: [
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559508551-44bff1de756b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=300&fit=crop",
    ],
    isAvailable: false,
    pricePerNight: 380000,
    roomType: "Phòng Gia đình",
    updatedAt: "2025-04-10T06:22:25.185Z",
  },
  {
    __v: 0,
    _id: "67f76385197ac559e4089b6a",
    amenities: [
      "Tầm nhìn toàn cảnh",
      "Sân riêng",
      "Dịch vụ quản gia",
      "Bồn tắm nước nóng",
    ],
    createdAt: "2025-04-10T06:21:57.442Z",
    description:
      "Trải nghiệm sang trọng tuyệt vời trong Phòng Penthouse của chúng tôi. Phòng rộng rãi này có các tiện nghi cao cấp, tầm nhìn toàn cảnh tuyệt đẹp và nội thất thanh lịch được thiết kế cho du khách khó tính. Hoàn hảo cho các cặp đôi tìm kiếm kỳ nghỉ lãng mạn hoặc những nhà du lịch kinh doanh đánh giá cao sự thoải mái và phong cách.",
    hotel: hotelsData[5],
    images: [
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
    ],
    isAvailable: true,
    pricePerNight: 650000,
    roomType: "Phòng Penthouse",
    updatedAt: "2025-04-10T06:21:57.442Z",
  },
];

export const bookingData = [
  {
    __v: 0,
    _id: "67f76839994a731e97d3b8ce",
    checkInDate: "2025-04-30T00:00:00.000Z",
    checkOutDate: "2025-05-01T00:00:00.000Z",
    createdAt: "2025-04-10T06:42:01.529Z",
    guests: 2,
    hotel: hotelsData[1],
    isPaid: true,
    paymentMethod: "Stripe",

    room: roomsData[1],
    status: "Đã xác nhận",
    totalPrice: 350000,
    updatedAt: "2025-04-10T06:43:54.520Z",
  },
  {
    __v: 0,
    _id: "67f76829994a731e97d3b8c3",
    checkInDate: "2025-04-27T00:00:00.000Z",
    checkOutDate: "2025-04-28T00:00:00.000Z",
    createdAt: "2025-04-10T06:41:45.873Z",
    guests: 1,
    hotel: hotelsData[0],
    isPaid: false,
    paymentMethod: "Thanh toán tại khách sạn",

    room: roomsData[0],
    status: "Đang chờ xử lý",
    totalPrice: 450000,
    updatedAt: "2025-04-10T06:41:45.873Z",
  },
  {
    __v: 0,
    _id: "67f76810994a731e97d3b8b4",
    checkInDate: "2025-04-11T00:00:00.000Z",
    checkOutDate: "2025-04-12T00:00:00.000Z",
    createdAt: "2025-04-10T06:41:20.501Z",
    guests: 1,
    hotel: hotelsData[2],
    isPaid: false,
    paymentMethod: "Thanh toán tại khách sạn",

    room: roomsData[2],
    status: "Đã hủy",
    totalPrice: 280000,
    updatedAt: "2025-04-10T06:41:20.501Z",
  },
];
