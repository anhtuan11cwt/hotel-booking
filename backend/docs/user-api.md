# User API – Tài liệu Postman

**Base URL**: `http://localhost:5000`  
**Prefix chung**: `/api/user`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:5000/api/user/signup`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "message": "Đăng ký thành công",
  "success": true,
  "user": {
    "email": "user@example.com",
    "id": "...",
    "name": "Nguyen Van A",
    "role": "user"
  }
}
```

- 400 (thiếu trường):

```json
{
  "message": "Vui lòng nhập đầy đủ thông tin",
  "success": false
}
```

- 400 (email đã tồn tại):

```json
{
  "message": "Email đã được sử dụng",
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

## 2. Đăng nhập

- **Method**: POST
- **URL**: `http://localhost:5000/api/user/login`
- **Authorization**: Không (nhận cookie JWT sau khi đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

- **Response**:
  - 200 (thành công) – cookie `token` được set trong trình duyệt/Postman:

```json
{
  "message": "Đăng nhập thành công",
  "success": true,
  "user": {
    "email": "user@example.com",
    "id": "...",
    "name": "Nguyen Van A",
    "role": "user"
  }
}
```

- 400 (thiếu trường):

```json
{
  "message": "Vui lòng nhập email và mật khẩu",
  "success": false
}
```

- 400 (sai email hoặc mật khẩu):

```json
{
  "message": "Email hoặc mật khẩu không đúng",
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

## 3. Đăng xuất (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:5000/api/user/logout`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}` (Postman có thể tự đính kèm nếu đã login)
- **Body**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "message": "Đăng xuất thành công",
  "success": true
}
```

- 401 (chưa đăng nhập / không có token):

```json
{
  "message": "Không được phép",
  "success": false
}
```

- 401 (token không hợp lệ):

```json
{
  "message": "Token không hợp lệ",
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

## 4. Kiểm tra trạng thái đăng nhập (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:5000/api/user/is-auth`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}` (nếu Postman không tự gửi)
- **Body**: Không

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "role": "user"
  }
}
```

- 401 (chưa đăng nhập / không có token):

```json
{
  "message": "Không được phép",
  "success": false
}
```

- 401 (token không hợp lệ):

```json
{
  "message": "Token không hợp lệ",
  "success": false
}
```

---

## Ghi chú chung

- **Cookie JWT**:
  - Được set sau khi đăng nhập thành công ở endpoint `/api/user/login`
  - Thuộc tính:
    - `httpOnly: true`
    - `maxAge: 24 giờ`
- **Các role hợp lệ**: `user`, `owner`

- **Postman Tips**:
  - Bật **"Save cookies"** để tự động lưu và gửi cookie trong các request tiếp theo
  - Kiểm tra tab **Cookies** để xem token đã được set chưa

