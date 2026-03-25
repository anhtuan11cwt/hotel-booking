# Hotel Booking - Ứng dụng đặt phòng khách sạn

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=nodedotjs&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

Ứng dụng đặt phòng khách sạn full-stack được xây dựng với kiến trúc MERN (MongoDB, Express.js, React, Node.js). Hỗ trợ hai vai trò người dùng: **User** (khách hàng đặt phòng) và **Owner** (chủ khách sạn quản lý).

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [API Endpoints](#api-endpoints)
- [Cài đặt và chạy dự án](#cài-đặt-và-chạy-dự-án)
- [Biến môi trường](#biến-môi-trường)
- [Triển khai](#triển-khai)
- [Tác giả](#tác-giả)

## Tính năng

### Người dùng (User)
- Đăng ký / Đăng nhập / Đăng xuất
- Tìm kiếm và duyệt danh sách khách sạn và phòng
- Xem chi tiết phòng với hình ảnh, mô tả, tiện nghi
- Kiểm tra tình trạng phòng trống theo ngày
- Đặt phòng với hai phương thức thanh toán: **Thanh toán tại khách sạn** hoặc **Stripe**
- Xem lịch sử đặt phòng cá nhân
- Hủy đặt phòng (trước ngày check-in)
- Nhận email xác nhận đặt phòng tự động

### Chủ khách sạn (Owner)
- Đăng ký khách sạn với thông tin chi tiết và hình ảnh
- Quản lý danh sách khách sạn (xem, xóa)
- Thêm phòng mới cho khách sạn với nhiều hình ảnh
- Quản lý danh sách phòng (xem, xóa)
- Xem tất cả đặt phòng từ khách hàng
- Xác nhận đặt phòng

### Chung
- Giao diện responsive (mobile, tablet, desktop)
- Animation mượt mà với Motion (Framer Motion)
- Toast notifications với react-hot-toast
- Phân quyền người dùng với JWT và cookies

## Công nghệ sử dụng

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|--------|
| React | 19.x | Thư viện UI |
| React Router | 7.x | Định tuyến |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Axios | 1.x | HTTP client |
| Motion | 12.x | Animation library |
| Lucide React | 0.577 | Icon library |
| react-hot-toast | 2.x | Toast notifications |
| Vite | 8.x | Build tool |

### Backend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|--------|
| Express.js | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| JWT | 9.x | Xác thực |
| bcryptjs | 3.x | Mã hóa mật khẩu |
| Multer | 2.x | Upload file |
| Cloudinary | 1.x | Lưu trữ hình ảnh |
| Nodemailer | 8.x | Gửi email |
| Stripe | 20.x | Thanh toán |
| Cookie Parser | 1.x | Cookie handling |

### Dev Tools
- Biome (Formatter & Linter)
- ESLint
- Nodemon (Hot reload)

## Cấu trúc dự án

```
hotel-booking/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cấu hình Cloudinary
│   │   ├── connectDB.js        # Kết nối MongoDB
│   │   ├── multer.js           # Cấu hình upload file
│   │   └── nodemailer.js       # Cấu hình gửi email
│   ├── controllers/
│   │   ├── book.controller.js  # Xử lý đặt phòng
│   │   ├── hotel.controller.js # Xử lý khách sạn
│   │   ├── room.controller.js  # Xử lý phòng
│   │   └── user.controller.js  # Xử lý người dùng
│   ├── middleware/
│   │   ├── isAuthenticated.js  # Kiểm tra đăng nhập
│   │   └── isOwner.js          # Kiểm tra quyền owner
│   ├── models/
│   │   ├── booking.model.js    # Schema đặt phòng
│   │   ├── hotel.model.js      # Schema khách sạn
│   │   ├── room.model.js       # Schema phòng
│   │   └── user.model.js       # Schema người dùng
│   ├── routes/
│   │   ├── book.routes.js      # Routes đặt phòng
│   │   ├── hotel.routes.js     # Routes khách sạn
│   │   ├── room.routes.js      # Routes phòng
│   │   └── user.routes.js      # Routes người dùng
│   ├── utils/
│   │   ├── booking_mail_options.js  # Template email xác nhận
│   │   └── cloudinary.js        # Utility Cloudinary
│   ├── index.js                 # Entry point server
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Hình ảnh, icons
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx         # Banner trang chủ
│   │   │   ├── HotelCard.jsx    # Card khách sạn
│   │   │   ├── HotelSearchForm.jsx # Form tìm kiếm
│   │   │   ├── Loader.jsx       # Loading spinner
│   │   │   ├── MostPicked.jsx   # Khách sạn nổi bật
│   │   │   ├── Navbar.jsx       # Thanh điều hướng
│   │   │   ├── Newsletter.jsx   # Đăng ký nhận tin
│   │   │   ├── PopularRooms.jsx # Phòng phổ biến
│   │   │   ├── RoomCard.jsx     # Card phòng
│   │   │   └── Testimonials.jsx # Đánh giá
│   │   ├── context/
│   │   │   └── AppContext.jsx   # Global state (Context API)
│   │   ├── pages/
│   │   │   ├── About.jsx        # Trang giới thiệu
│   │   │   ├── Home.jsx         # Trang chủ
│   │   │   ├── HotelRooms.jsx   # Danh sách phòng theo KS
│   │   │   ├── Hotels.jsx       # Danh sách khách sạn
│   │   │   ├── Login.jsx        # Đăng nhập
│   │   │   ├── MyBookings.jsx   # Đặt phòng của tôi
│   │   │   ├── Rooms.jsx        # Danh sách tất cả phòng
│   │   │   ├── Signup.jsx       # Đăng ký
│   │   │   ├── SingleRoom.jsx   # Chi tiết phòng
│   │   │   └── owner/
│   │   │       ├── AddRoom.jsx       # Thêm phòng
│   │   │       ├── AllHotels.jsx     # Quản lý khách sạn
│   │   │       ├── AllRooms.jsx      # Quản lý phòng
│   │   │       ├── Bookings.jsx      # Quản lý đặt phòng
│   │   │       ├── OwnerLayout.jsx   # Layout cho owner
│   │   │       └── RegisterHotel.jsx # Đăng ký khách sạn
│   │   ├── utils/
│   │   │   ├── amenityIcons.jsx # Icons tiện nghi
│   │   │   └── currency.js      # Định dạng tiền tệ
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── netlify.toml                 # Cấu hình deploy Netlify
├── .gitignore
└── README.md
```

## API Endpoints

### Người dùng (`/api/user`)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| POST | `/signup` | Đăng ký tài khoản | No |
| POST | `/login` | Đăng nhập | No |
| GET | `/logout` | Đăng xuất | Yes |
| GET | `/is-auth` | Kiểm tra đăng nhập | Yes |

### Khách sạn (`/api/hotel`)

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|--------|------|------|
| POST | `/register` | Đăng ký khách sạn mới | Yes | Owner |
| GET | `/get` | Lấy khách sạn của owner | Yes | Owner |
| GET | `/getall` | Lấy tất cả khách sạn | No | - |
| DELETE | `/delete/:id` | Xóa khách sạn | Yes | Owner |

### Phòng (`/api/room`)

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|--------|------|------|
| POST | `/add` | Thêm phòng mới (tối đa 4 ảnh) | Yes | Owner |
| GET | `/owner` | Lấy phòng của owner | Yes | Owner |
| GET | `/all` | Lấy tất cả phòng khả dụng | No | - |
| GET | `/:id` | Lấy chi tiết phòng theo ID | No | - |
| DELETE | `/delete/:id` | Xóa phòng | Yes | Owner |

### Đặt phòng (`/api/bookings`)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| POST | `/check-availability` | Kiểm tra tình trạng phòng | No |
| POST | `/book` | Đặt phòng | Yes |
| POST | `/stripe-payment` | Tạo phiên thanh toán Stripe | Yes |
| GET | `/verify-payment` | Xác nhận thanh toán Stripe | Yes |
| GET | `/user` | Lấy đặt phòng của user | Yes |
| GET | `/hotel` | Lấy đặt phòng của owner | Yes |
| PUT | `/confirm/:id` | Xác nhận đặt phòng | Yes |
| DELETE | `/cancel/:id` | Hủy đặt phòng | Yes |

## Cài đặt và chạy dự án

### Yêu cầu

- Node.js >= 18
- MongoDB (local hoặc MongoDB Atlas)
- Cloudinary account
- Stripe account
- SMTP server (Gmail hoặc dịch vụ email khác)

### Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env và cấu hình biến môi trường (xem mục Biến môi trường)

# Chạy server development (với nodemon)
npm run dev

# Chạy server production
npm start
```

Server chạy tại `http://localhost:5000`

### Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env và cấu hình biến môi trường (xem mục Biến môi trường)

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

Frontend chạy tại `http://localhost:5173`

## Biến môi trường

### Backend (`backend/.env`)

```env
# Cổng server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hotel-booking

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SENDER_EMAIL=your_email@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Frontend URL (cho CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

## Triển khai

### Netlify (Frontend)

Dự án đã có cấu hình `netlify.toml` sẵn sàng triển khai trên Netlify:

```toml
[build]
  base = "frontend"
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Backend

Backend có thể triển khai trên:
- Render
- Railway
- Heroku
- VPS (Vultr, DigitalOcean, AWS EC2)

## Tác giả

**Trần Anh Tuấn**

---

Nếu bạn thấy dự án hữu ích, hãy để lại một ⭐ trên GitHub!
