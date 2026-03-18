## Hotel API – Tài liệu Postman

**Base URL**: `http://localhost:5000`  
**Prefix chung**: `/api/hotel`

---

## 1. Đăng ký khách sạn (chủ sở hữu)

- **Method**: POST  
- **URL**: `http://localhost:5000/api/hotel/register`  
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Yêu cầu **role**: `owner`
- **Mô tả**: Tạo mới một khách sạn thuộc về người dùng đang đăng nhập.
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body** (form-data):
  - `hotelName` (text, bắt buộc): Tên khách sạn
  - `hotelAddress` (text, bắt buộc): Địa chỉ khách sạn
  - `price` (number, bắt buộc): Giá mỗi đêm
  - `rating` (number, tùy chọn): Đánh giá ban đầu (0–5)
  - `amenities` (text, tùy chọn): Danh sách tiện ích, phân tách bằng dấu phẩy, ví dụ: `wifi,pool,parking`
  - `image` (file, tùy chọn): Ảnh khách sạn (được upload lên Cloudinary)

- **Ví dụ body (dạng mô tả)**:

```text
hotelName: "Khách sạn A"
hotelAddress: "123 Đường ABC, Quận 1"
price: 1200000
rating: 4.5
amenities: "wifi,pool,parking"
image: (chọn file .jpg/.png/.webp)
```

- **Response**:
  - 201 (thành công):

```json
{
  "hotel": {
    "_id": "...",
    "hotelName": "Khách sạn A",
    "hotelAddress": "123 Đường ABC, Quận 1",
    "price": 1200000,
    "rating": 4.5,
    "amenities": ["wifi", "pool", "parking"],
    "image": "https://res.cloudinary.com/...",
    "owner": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Đăng ký khách sạn thành công",
  "success": true
}
```

  - 400 (thiếu trường bắt buộc `hotelName`, `hotelAddress` hoặc `price`):

```json
{
  "message": "Vui lòng nhập đầy đủ thông tin",
  "success": false
}
```

  - 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false,
  "error": "..."
}
```

---

## 2. Lấy danh sách khách sạn của chủ sở hữu

- **Method**: GET  
- **URL**: `http://localhost:5000/api/hotel/get`  
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Vai trò: người dùng có `role` hợp lệ, thường là `owner`
- **Mô tả**: Lấy danh sách tất cả khách sạn thuộc về user đang đăng nhập.
- **Headers**:
  - `Cookie: token={jwt_token}` (Postman có thể tự đính kèm sau khi login)
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "hotels": [
    {
      "_id": "...",
      "hotelName": "Khách sạn A",
      "hotelAddress": "123 Đường ABC, Quận 1",
      "price": 1200000,
      "rating": 4.5,
      "amenities": ["wifi", "pool", "parking"],
      "image": "https://res.cloudinary.com/...",
      "owner": {
        "_id": "...",
        "name": "Owner Name",
        "email": "owner@example.com"
      }
    }
  ],
  "success": true
}
```

  - 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false,
  "error": "..."
}
```

---

## 3. Lấy toàn bộ khách sạn (public)

- **Method**: GET  
- **URL**: `http://localhost:5000/api/hotel/getall`  
- **Authorization**: Không
- **Mô tả**: Trả về danh sách toàn bộ khách sạn có trong hệ thống.
- **Headers**: Không bắt buộc
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "hotels": [
    {
      "_id": "...",
      "hotelName": "Khách sạn A",
      "hotelAddress": "123 Đường ABC, Quận 1",
      "price": 1200000,
      "rating": 4.5,
      "amenities": ["wifi", "pool", "parking"],
      "image": "https://res.cloudinary.com/...",
      "owner": {
        "_id": "...",
        "name": "Owner Name",
        "email": "owner@example.com"
      }
    }
  ],
  "success": true
}
```

  - 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false,
  "error": "..."
}
```

---

## 4. Xóa khách sạn (chủ sở hữu)

- **Method**: DELETE  
- **URL**: `http://localhost:5000/api/hotel/delete/:id`  
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Yêu cầu **role**: `owner`
- **Mô tả**: Xóa một khách sạn theo `id`. Chỉ chủ sở hữu hợp lệ mới được phép xóa.
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Params**:
  - `id` (string, bắt buộc): ID của khách sạn cần xóa
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Xóa khách sạn thành công",
  "success": true
}
```

  - 404 (không tìm thấy khách sạn):

```json
{
  "message": "Không tìm thấy khách sạn",
  "success": false
}
```

  - 500 (lỗi server):

```json
{
  "message": "Lỗi server",
  "success": false,
  "error": "..."
}
```

---

## 5. Ghi chú về model `Hotel`

- **Nguồn**: `hotel.model.js`  
- **Các trường chính**:
  - `hotelName` (String, bắt buộc)
  - `hotelAddress` (String, bắt buộc)
  - `price` (Number, bắt buộc)
  - `rating` (Number, mặc định `0`)
  - `amenities` (Array\<String\>, mặc định `[]`)
  - `image` (String, URL ảnh trên Cloudinary)
  - `owner` (ObjectId, bắt buộc, tham chiếu tới `User`)
  - Có `timestamps`: `createdAt`, `updatedAt`

---

## 6. Ghi chú về upload ảnh (Cloudinary & Multer)

- **Nguồn cấu hình**:
  - `config/cloudinary.js`: Kết nối Cloudinary bằng các biến môi trường:
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `CLOUDINARY_CLOUD_NAME`
  - `config/multer.js`: Dùng `multer-storage-cloudinary`:
    - Thư mục lưu: `"hotel-booking"`
    - Định dạng cho phép: `jpg`, `jpeg`, `png`, `gif`, `webp`
    - `transformation`: giới hạn kích thước `width: 1200`, `height: 800`
- **Trong route đăng ký khách sạn**:
  - Sử dụng `upload.single("image")`  
  - Ảnh được upload lên Cloudinary, đường dẫn được gán vào field `image` của `Hotel`.

---

## 7. Ghi chú về cấu hình server

- **Nguồn**: `index.js`
  - Sử dụng `express`, `cors`, `cookie-parser`
  - Đọc cấu hình từ `.env` (qua `dotenv.config()`)
  - Static folder cho ảnh local (nếu có): `/images` trỏ tới thư mục `uploads`
  - Mount routes:
    - `/api/user` → `user.routes.js`
    - `/api/hotel` → `hotel.routes.js`
  - Kết nối MongoDB thông qua `connectDB()`

---

## Postman Tips

- Đảm bảo đã gọi endpoint `/api/user/login` trước để nhận cookie JWT nếu cần các endpoint yêu cầu đăng nhập.
- Kiểm tra tab **Cookies** trong Postman để xác nhận cookie `token` đã được set.
- Với request upload file (`/api/hotel/register`), nhớ chọn:
  - `Body` → `form-data`
  - Trường `image` chọn **Type: File**.

