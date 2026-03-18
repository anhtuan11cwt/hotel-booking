## Booking API – Tài liệu Postman

**Base URL**: `http://localhost:5000`  
**Prefix chung**: `/api/bookings`

---

## 1. Kiểm tra phòng trống

- **Method**: POST
- **URL**: `http://localhost:5000/api/bookings/check-availability`
- **Authorization**: Không
- **Mô tả**: Kiểm tra xem một phòng cụ thể có còn trống trong khoảng thời gian đã chọn hay không.
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):
  - `roomId` (string, bắt buộc): ID của phòng cần kiểm tra.
  - `checkIn` (date, bắt buộc): Ngày nhận phòng (YYYY-MM-DD).
  - `checkOut` (date, bắt buộc): Ngày trả phòng (YYYY-MM-DD).

- **Ví dụ body**:

```json
{
  "roomId": "65f1234567890abcdef12345",
  "checkIn": "2024-04-01",
  "checkOut": "2024-04-05"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "isAvailable": true,
  "success": true
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false
}
```

---

## 2. Đặt phòng

- **Method**: POST
- **URL**: `http://localhost:5000/api/bookings/book`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Tạo một đơn đặt phòng mới. Hệ thống sẽ tự động tính toán `totalPrice` dựa trên số đêm và số người. Ngoài ra, một email xác nhận sẽ được gửi tới hòm thư của người dùng sau khi hoàn thành.
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):
  - `roomId` (string, bắt buộc): ID của phòng.
  - `hotelId` (string, bắt buộc): ID của khách sạn.
  - `checkIn` (date, bắt buộc): Ngày nhận phòng.
  - `checkOut` (date, bắt buộc): Ngày trả phòng.
  - `persons` (number, bắt buộc): Số lượng khách.

- **Ví dụ body**:

```json
{
  "roomId": "65f1234567890abcdef12345",
  "hotelId": "65f0987654321fedcba09876",
  "checkIn": "2024-04-01",
  "checkOut": "2024-04-05",
  "persons": 2
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "booking": {
    "_id": "65f234567890abcdef123456",
    "checkIn": "2024-04-01T00:00:00.000Z",
    "checkOut": "2024-04-05T00:00:00.000Z",
    "hotel": "65f0987654321fedcba09876",
    "user": "65f00123456789abcdef0123",
    "room": "65f1234567890abcdef12345",
    "persons": 2,
    "totalPrice": 4800000,
    "status": "pending",
    "paymentMethod": "Pay at hotel",
    "isPaid": false,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "success": true
}
```

- 400 (phòng không còn trống):

```json
{
  "message": "Phòng không còn trống",
  "success": false
}
```

- 404 (không tìm thấy phòng):

```json
{
  "message": "Phòng không tìm thấy",
  "success": false
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false
}
```

---

## 3. Lấy lịch sử đặt phòng của người dùng

- **Method**: GET
- **URL**: `http://localhost:5000/api/bookings/user`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Lấy toàn bộ danh sách các đơn đặt phòng của chính người dùng đang đăng nhập. Kết quả được sắp xếp theo thời gian tạo mới nhất.
- **Headers**: Không
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "bookings": [
    {
      "_id": "...",
      "checkIn": "...",
      "checkOut": "...",
      "hotel": {
        "_id": "...",
        "hotelName": "Khách sạn A",
        "hotelAddress": "..."
      },
      "room": {
        "_id": "...",
        "roomNumber": "101",
        "pricePerNight": 1200000
      },
      "persons": 2,
      "totalPrice": 4800000,
      "status": "pending",
      "createdAt": "..."
    }
  ],
  "success": true
}
```

---

## 4. Lấy danh sách đặt phòng của khách sạn (cho chủ sở hữu)

- **Method**: GET
- **URL**: `http://localhost:5000/api/bookings/hotel`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Lấy danh sách toàn bộ các đơn đặt phòng của tất cả các khách sạn thuộc quyền sở hữu của người dùng đang đăng nhập.
- **Headers**: Không
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "bookings": [
    {
      "_id": "...",
      "checkIn": "...",
      "checkOut": "...",
      "hotel": {
        "_id": "...",
        "hotelName": "Khách sạn A"
      },
      "room": {
        "_id": "...",
        "roomNumber": "101"
      },
      "user": {
        "_id": "...",
        "name": "Người mua A",
        "email": "customer@example.com"
      },
      "persons": 2,
      "totalPrice": 4800000,
      "status": "pending",
      "createdAt": "..."
    }
  ],
  "success": true
}
```

---

## 5. Xác nhận đặt phòng (chủ sở hữu)

- **Method**: PUT
- **URL**: `http://localhost:5000/api/bookings/confirm/:id`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Chủ sở hữu khách sạn xác nhận đơn đặt phòng. Trạng thái đơn đặt phòng sẽ chuyển thành `confirmed`.
- **Headers**: Không
- **Params**:
  - `id` (string, bắt buộc): ID của đơn đặt phòng cần xác nhận.
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "booking": {
    "_id": "...",
    "status": "confirmed",
    "updatedAt": "..."
  },
  "message": "Xác nhận đặt phòng thành công",
  "success": true
}
```

- 404 (không tìm thấy):

```json
{
  "message": "Không tìm thấy đặt phòng",
  "success": false
}
```

---

## 6. Hủy đặt phòng

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/bookings/cancel/:id`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Hủy đơn đặt phòng. Trạng thái đơn đặt phòng sẽ chuyển thành `cancelled`.
- **Headers**: Không
- **Params**:
  - `id` (string, bắt buộc): ID của đơn đặt phòng cần hủy.
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "booking": {
    "_id": "...",
    "status": "cancelled",
    "updatedAt": "..."
  },
  "message": "Hủy đặt phòng thành công",
  "success": true
}
```

- 404 (không tìm thấy):

```json
{
  "message": "Không tìm thấy đặt phòng",
  "success": false
}
```

---

## 7. Thanh toán qua Stripe

- **Method**: POST
- **URL**: `http://localhost:5000/api/bookings/stripe-payment`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
- **Mô tả**: Tạo một phiên thanh toán (Checkout Session) qua Stripe cho đơn đặt phòng. Sau khi tạo session thành công, trạng thái đơn hàng sẽ được cập nhật thành `confirmed` và `isPaid: true` (Lưu ý: Đây là logic tối giản, thực tế nên dùng Webhook để xác nhận thanh toán).
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):
  - `bookingId` (string, bắt buộc): ID của đơn đặt phòng.

- **Ví dụ body**:

```json
{
  "bookingId": "65f234567890abcdef123456"
}
```

- **Response**:
  - 200 (thành công): Trả về URL dẫn đến trang thanh toán của Stripe.

```json
{
  "success": true,
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

- 404 (không tìm thấy đặt phòng):

```json
{
  "message": "Không tìm thấy đặt phòng",
  "success": false
}
```

- 500 (lỗi server):

```json
{
  "message": "...",
  "success": false
}
```

---

## 8. Ghi chú về model `Booking`

- **Nguồn**: `booking.model.js`
- **Các trường chính**:
  - `checkIn` (Date, bắt buộc)
  - `checkOut` (Date, bắt buộc)
  - `hotel` (ObjectId, tham chiếu tới `Hotel`, bắt buộc)
  - `room` (ObjectId, tham chiếu tới `Room`, bắt buộc)
  - `user` (ObjectId, tham chiếu tới `User`, bắt buộc)
  - `persons` (Number, bắt buộc)
  - `totalPrice` (Number, bắt buộc)
  - `status` (String, enum: `["confirmed", "pending", "cancelled"]`, mặc định `"pending"`)
  - `paymentMethod` (String, mặc định `"Pay at hotel"`)
  - `isPaid` (Boolean, mặc định `false`)
  - Có `timestamps`: `createdAt`, `updatedAt`

---

## 9. Tóm tắt Routes

| Method | Endpoint | Mô tả | Authorization |
|--------|----------|-------|---------------|
| POST | `/api/bookings/check-availability` | Kiểm tra phòng trống | Public |
| POST | `/api/bookings/book` | Tạo đơn đặt phòng | Cần login |
| POST | `/api/bookings/stripe-payment` | Thanh toán qua Stripe | Cần login |
| GET | `/api/bookings/user` | Lấy lịch sử đặt phòng user | Cần login |
| GET | `/api/bookings/hotel` | Lấy đơn đặt phòng của khách sạn | Cần login |
| PUT | `/api/bookings/confirm/:id` | Xác nhận đặt phòng | Cần login |
| DELETE | `/api/bookings/cancel/:id` | Hủy đặt phòng | Cần login |

---

## Postman Tips

- Đảm bảo đã gọi endpoint `/api/user/login` hoặc `/api/user/register` để có cookie `token` trước khi thực hiện các yêu cầu đặt phòng hoặc xem lịch sử.
- Định dạng ngày gửi lên nên là chuỗi ISO hoặc định dạng YYYY-MM-DD mà JavaScript `new Date()` có thể hiểu được.
- Đơn giá `totalPrice` được tính theo công thức: `room.pricePerNight * số đêm * số người`.
