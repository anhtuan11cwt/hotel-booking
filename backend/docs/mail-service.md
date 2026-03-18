# Dịch vụ Email (Nodemailer) – Tài liệu Nội bộ

Dịch vụ email được sử dụng để gửi các thông báo tự động (như xác nhận đặt phòng) từ hệ thống tới hòm thư của khách hàng.

---

## 1. Cấu hình Nodemailer
Nguồn: `backend/config/nodemailer.js`

Dịch vụ sử dụng thư viện `nodemailer` để kết nối với máy chủ SMTP. Các tham số cấu hình được lấy từ biến môi trường (`.env`):

- **SMTP_HOST**: Địa chỉ máy chủ (ví dụ: `smtp.gmail.com`).
- **SMTP_PORT**: Cổng máy chủ (ví dụ: `465` hoặc `587`).
- **SMTP_USER**: Email tài khoản gửi thư.
- **SMTP_PASS**: Mật khẩu ứng dụng (App Password) của tài khoản email.
- **SENDER_EMAIL**: Email hiển thị tại mục người gửi (From).

---

## 2. Các Mẫu Mail (Mail Options)
Nguồn: `backend/utils/booking_mail_options.js`

Hệ thống hiện tại có mẫu **Xác nhận đặt phòng thành công** (`buildBookingMailOptions`).

### Chi tiết nội dung:
- **Tiêu đề (Subject)**: `Xác nhận đặt phòng thành công`
- **Các thông tin bao gồm**:
  - Tên khách hàng (`user.name`)
  - Mã đơn hàng (`booking._id`)
  - Khách sạn (`hotel.name`)
  - Loại phòng (`room.type`)
  - Ngày nhận/trả phòng (định dạng `vi-VN`)
  - Số lượng người (`booking.persons`)
  - Tổng chi phí (định dạng tiền tệ `VNĐ`)
  - Phương thức thanh toán (`booking.paymentMethod`)

---

## 3. Cách thức hoạt động trong Controller
Nguồn: `backend/controllers/book.controller.js`

Trong hàm `bookRoom`, quy trình gửi email được thực hiện như sau:
1. Sau khi bản ghi `Booking` được tạo thành công trong Database.
2. Tìm kiếm thông tin người dùng từ `userId`.
3. Gọi hàm `sendBookingEmail` để chuẩn bị `mailOptions` và thực hiện gửi thư qua `transporter`.

```javascript
// Ví dụ logic gọi gửi mail
const user = await User.findById(userId);
await sendBookingEmail(user, booking, room, room.hotel);
```

---

## 4. Lưu ý khi cài đặt (Troubleshooting)
1. Hãy đảm bảo đã bật cấu hình **App Password** nếu sử dụng Gmail hoặc các dịch vụ có bảo mật 2 lớp.
2. Kiểm tra log của backend nếu email không gửi được (thường do sai cấu hình host/port hoặc sai xác thực).
3. Đảm bảo biến môi trường `SENDER_EMAIL` trùng với tài khoản đăng nhập SMTP để tránh bị lọc spam.
