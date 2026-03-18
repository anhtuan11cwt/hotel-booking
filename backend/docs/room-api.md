# Room API – Tài liệu Postman

**Base URL**: `http://localhost:5000`  
**Prefix chung**: `/api/room`

---

## 1. Thêm phòng mới (chủ sở hữu)

- **Method**: POST
- **URL**: `http://localhost:5000/api/room/add`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Yêu cầu **role**: `owner`
- **Mô tả**: Tạo mới một phòng thuộc về khách sạn của người dùng đang đăng nhập.
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body** (form-data):
  - `hotel` (text, bắt buộc): ID của khách sạn
  - `roomType` (text, bắt buộc): Loại phòng (ví dụ: "Standard", "Deluxe", "Suite")
  - `pricePerNight` (number, bắt buộc): Giá mỗi đêm
  - `description` (text, bắt buộc): Mô tả phòng
  - `amenities` (text, tùy chọn): Danh sách tiện ích dạng JSON string, ví dụ: `["wifi", "tv", "minibar"]`
  - `isAvailable` (text, tùy chọn): `"true"` hoặc `"false"` (mặc định: `"true"`)
  - `image` (file, tùy chọn): Ảnh phòng (tối đa 4 ảnh, được upload lên Cloudinary)

- **Ví dụ body (dạng mô tả)**:

```text
hotel: "64f8a1b2c3d4e5f6a7b8c9d0"
roomType: "Deluxe"
pricePerNight: 1500000
description: "Phòng sang trọng với view biển"
amenities: "[\"wifi\", \"tv\", \"minibar\", \"balcony\"]"
isAvailable: "true"
image: (chọn file .jpg/.png/.webp - có thể chọn tối đa 4 ảnh)
```

- **Response**:
  - 201 (thành công):

```json
{
  "room": {
    "_id": "...",
    "hotel": "64f8a1b2c3d4e5f6a7b8c9d0",
    "roomType": "Deluxe",
    "pricePerNight": 1500000,
    "description": "Phòng sang trọng với view biển",
    "amenities": ["wifi", "tv", "minibar", "balcony"],
    "images": [
      "https://res.cloudinary.com/...",
      "https://res.cloudinary.com/..."
    ],
    "isAvailable": true,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Thêm phòng thành công",
  "success": true
}
```

- 400 (thiếu trường bắt buộc `hotel`, `roomType`, `pricePerNight` hoặc `description`):

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

## 2. Lấy danh sách phòng của chủ sở hữu

- **Method**: GET
- **URL**: `http://localhost:5000/api/room/owner`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Vai trò: người dùng có `role` hợp lệ, thường là `owner`
- **Mô tả**: Lấy danh sách tất cả phòng thuộc về các khách sạn của user đang đăng nhập.
- **Headers**:
  - `Cookie: token={jwt_token}` (Postman có thể tự đính kèm sau khi login)
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "rooms": [
    {
      "_id": "...",
      "hotel": {
        "_id": "...",
        "hotelName": "Khách sạn A",
        "hotelAddress": "123 Đường ABC, Quận 1",
        "owner": {
          "name": "Owner Name",
          "email": "owner@example.com",
          "phone": "0901234567"
        }
      },
      "roomType": "Deluxe",
      "pricePerNight": 1500000,
      "description": "Phòng sang trọng với view biển",
      "amenities": ["wifi", "tv", "minibar"],
      "images": ["https://res.cloudinary.com/..."],
      "isAvailable": true
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

## 3. Lấy toàn bộ phòng có sẵn (public)

- **Method**: GET
- **URL**: `http://localhost:5000/api/room/all`
- **Authorization**: Không
- **Mô tả**: Trả về danh sách tất cả phòng có `isAvailable: true` trong hệ thống.
- **Headers**: Không bắt buộc
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "rooms": [
    {
      "_id": "...",
      "hotel": {
        "_id": "...",
        "hotelName": "Khách sạn A",
        "hotelAddress": "123 Đường ABC, Quận 1",
        "owner": {
          "name": "Owner Name",
          "email": "owner@example.com",
          "phone": "0901234567"
        }
      },
      "roomType": "Standard",
      "pricePerNight": 800000,
      "description": "Phòng tiêu chuẩn",
      "amenities": ["wifi", "tv"],
      "images": ["https://res.cloudinary.com/..."],
      "isAvailable": true,
      "createdAt": "...",
      "updatedAt": "..."
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

## 4. Lấy thông tin phòng theo ID

- **Method**: GET
- **URL**: `http://localhost:5000/api/room/:id`
- **Authorization**: Không
- **Mô tả**: Lấy chi tiết một phòng theo `id`. Trả về thông tin đầy đủ bao gồm khách sạn chủ sở hữu.
- **Headers**: Không bắt buộc
- **Params**:
  - `id` (string, bắt buộc): ID của phòng cần lấy
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "room": {
    "_id": "...",
    "hotel": {
      "_id": "...",
      "hotelName": "Khách sạn A",
      "hotelAddress": "123 Đường ABC, Quận 1",
      "owner": {
        "_id": "...",
        "name": "Owner Name",
        "email": "owner@example.com",
        "phone": "0901234567"
      }
    },
    "roomType": "Deluxe",
    "pricePerNight": 1500000,
    "description": "Phòng sang trọng với view biển",
    "amenities": ["wifi", "tv", "minibar", "balcony"],
    "images": ["https://res.cloudinary.com/..."],
    "isAvailable": true,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "success": true
}
```

- 404 (không tìm thấy phòng):

```json
{
  "message": "Không tìm thấy phòng",
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

## 5. Xóa phòng (chủ sở hữu)

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/room/delete/:id`
- **Authorization**:
  - Yêu cầu đăng nhập (cookie JWT `token`)
  - Yêu cầu **role**: `owner`
- **Mô tả**: Xóa một phòng theo `id`. Chỉ chủ sở hữu hợp lệ mới được phép xóa.
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Params**:
  - `id` (string, bắt buộc): ID của phòng cần xóa
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Xóa phòng thành công",
  "success": true
}
```

- 404 (không tìm thấy phòng):

```json
{
  "message": "Không tìm thấy phòng",
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

## 6. Model `Room`

- **Nguồn**: `room.model.js`
- **Các trường chính**:
  - `hotel` (ObjectId, bắt buộc, tham chiếu tới `Hotel`)
  - `roomType` (String, bắt buộc): Loại phòng
  - `pricePerNight` (Number, bắt buộc): Giá mỗi đêm
  - `description` (String, bắt buộc): Mô tả phòng
  - `amenities` (Array<String>, mặc định `[]`): Danh sách tiện ích
  - `images` (Array<String>, mặc định `[]`): URL ảnh trên Cloudinary
  - `maxGuests` (Number, mặc định `4`): Số lượng khách tối đa
  - `isAvailable` (Boolean, mặc định `true`): Trạng thái còn phòng
  - Có `timestamps`: `createdAt`, `updatedAt`

---

## 7. Middleware

- **`isAuthenticated`**: Kiểm tra JWT token trong cookie, nếu không có hoặc không hợp lệ sẽ trả lỗi 401
  - Được dùng bởi: `/add`, `/owner`, `/delete/:id`
  - Lấy `user.id` từ token để sử dụng trong logic controller

- **`isOwner`**: Kiểm tra xem user có role `owner` hay không
  - Được dùng bởi: `/add`, `/delete/:id`
  - Yêu cầu user phải đăng nhập trước (chạy sau `isAuthenticated`)

---

## 8. Upload ảnh (Cloudinary & Multer)

- **Cấu hình**:
  - `config/cloudinary.js`: Kết nối Cloudinary bằng các biến môi trường:
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `CLOUDINARY_CLOUD_NAME`
  - `config/multer.js`: Dùng `multer-storage-cloudinary`:
    - Thư mục lưu: `"hotel-booking"`
    - Định dạng cho phép: `jpg`, `jpeg`, `png`, `gif`, `webp`
    - `transformation`: giới hạn kích thước `width: 1200`, `height: 800`

- **Trong route thêm phòng**:
  - Sử dụng `upload.array("image", 4)` - cho phép upload tối đa 4 ảnh
  - Các ảnh được upload lên Cloudinary, đường dẫn được lưu vào field `images` của `Room` dưới dạng mảng.

---

## 9. Tóm tắt Routes

| Method | Endpoint | Mô tả | Authorization |
|--------|----------|-------|---------------|
| POST | `/api/room/add` | Thêm phòng mới | Cần login, role: owner |
| GET | `/api/room/owner` | Lấy phòng của chủ sở hữu | Cần login |
| GET | `/api/room/all` | Lấy tất cả phòng còn trống | Public |
| GET | `/api/room/:id` | Lấy thông tin phòng theo ID | Public |
| DELETE | `/api/room/delete/:id` | Xóa phòng | Cần login, role: owner |

---

## Postman Tips

- Đảm bảo đã gọi endpoint `/api/user/login` trước để nhận cookie JWT nếu cần các endpoint yêu cầu đăng nhập.
- Kiểm tra tab **Cookies** trong Postman để xác nhận cookie `token` đã được set.
- Với request upload file (`/api/room/add`), nhớ chọn:
  - `Body` → `form-data`
  - Trường `image` chọn **Type: File**.
  - Có thể thêm nhiều file `image` (tối đa 4 ảnh) bằng cách thêm nhiều trường `image` trong form-data.
