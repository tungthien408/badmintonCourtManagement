## I. API cho người dùng

### 1. Tài khoản người dùng

#### 1.1. Đăng ký tài khoản ✅

**Endpoint:** `POST /api/users`  
**Request Body (JSON):**
```
{
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "email": "a@gmail.com",
    "username": "nguyenvana",
    "password": "12345678"
}
```
**Response Body (201 Created):** Thông tin người dùng
```
{
    "message": "Registration success",
    human: {
        "name": "Nguyễn Văn A",
        "phone": "0987654321",
        "email": "a@gmail.com",
        "username": "nguyenvana",
        "password": "12345678"
    }
    account: {
        "humanId": "123",
        "usernane": "nguyenvana",
        "passwordHash": "aslkfdjakhsglkasdfkl"
        "role": "customer"
    }
}
```

#### 1.2. Đăng nhập (chưa hoàn thiện)

**Endpoint:** `POST /api/auth/login`  
**Request Body (JSON):**
```
{
    "username": "nguyenvana",
    "password": "123456"
}
```
**Response Body (200 OK):**
```
{
    "message": "Authenticate Successfully",
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNzU2NDU4Njk0NDU1LCJpZCI6IjY4YTlhZjg5YzMzNzNkZDA0ZmE1YTFmNiIsInJvbGUiOiJvd25lciIsImlhdCI6MTc1NjQ1ODY5NCwiZXhwIjoxNzU2NDYyMjk0fQ.mt3meSteWHXJebFK8WvRWBPv6JQJjf1rtcO3XLwlf4o"
}
```

#### 1.3. Lấy thông tin người dùng ✅

**Endpoint:** `GET /api/users/me`  
**Response Body (JSON):**
```
{
    "human": {
        "_id": "68a993f85e472db9bc93b524",
        "name": "Admin",
        "phone": "0987654321"
    }
}
```

#### 1.4. Cập nhật thông tin cá nhân 

**Endpoint:** `PUT /api/users/me`  
**Request:** Thông tin cần cập nhật  
**Response:** Thông tin người dùng đã cập nhật

#### 1.5. Thay đổi mật khẩu

**Endpoint:** `PUT /api/users/change-password`  
**Request:** Mật khẩu cũ và mới  
**Response:** Thông báo thành công

#### 1.6. Quên mật khẩu 

**Endpoint:** `POST /api/auth/forgot-password`  
**Request:** Email  
**Response:** Thông báo đã gửi email khôi phục

#### 1.7. Đặt lại mật khẩu 

**Endpoint:** `POST /api/auth/reset-password`
**Request:** Token, mật khẩu mới  
**Response:** Thông báo thành công

### 2.Quản lý đặt sân

#### 2.1. Tạo đặt sân mới

**Endpoint:** `POST /api/users/booking`  
**Request Body (JSON):**
```
{
    "customerId": "123",
    "courtId": "234",
    "staffId": "staff01",
    "status": "pending",
    "bookingTime": "Wed Dec 19 2012 01:03:25 GMT-0500 (EST)",
    "startTime": "Wed Dec 19 2012 01:03:25 GMT-0500 (EST)"
    "endTime": "Wed Dec 19 2012 01:03:25 GMT-0500 (EST)"
}
```
**Response: 201 Created** 

#### 2.2. Cập nhật thông tin đặt sân

**Endpoint:** `PUT /api/users/booking/{id}`  
**Request:** Cập nhật thông tin đặt sân cụ thể (giờ, hủy đặt,...) 
**Response:** Thông tin đặt sân đã cập nhật

#### 2.3. Lấy danh sách các sân đã đặt (chưa hoàn thành)

**Endpoint:** `GET /api/users/booking`  
**Parameters:** `page`, `limit`, `search`, [status] ,`date_start`, `date_end`  
**Response:** Danh sách thông tin tất cả các đặt sân

#### 2.4. Lấy thông tin chi tiết của một đặt sân cụ thể

**Endpoint:** `GET /api/users/booking/{id}`
**Response:** Chi tiết đầy đủ của một đặt sân cụ thể

### 3.Thanh toán

#### 3.1. Tạo thanh toán

**Endpoint:** `POST /api/payments`  
**Request:** Thông tin thanh toán, phương thức thanh toán  
**Response:** Thông tin thanh toán

#### 3.2. Áp dụng mã giảm giá 

**Endpoint:** `POST /api/payments/voucher`  
**Request:** Mã giảm giá  
**Response:** Thông tin giỏ hàng đã áp dụng mã giảm giá

#### 3.3. Kiểm tra tình trạng thanh toán 

**Endpoint:** `GET /api/payments/{id}`  
**Response:** Trạng thái thanh toán (thành công hay thất bại) 

#### 3.4. Xem tất cả thanh toán của tôi

**Endpoint:** `GET /api/payments/me`  
**Response:** Lấy tất cả thanh toán của tôi 

### 4. Xem thông tin chi nhánh

### 5. Xem thông tin sân (dựa vào chi nhánh đã chọn)

### 6. Xem bảng giá (dựa vào chi nhánh đã chọn)

## II. API cho phần Admin

### 1. Quản lý chi nhánh ✅

#### 1.1. Lấy danh sách chi nhánh  ✅

**Endpoint:** `GET /api/branch` 
**Parameters:** `page`, `limit`, `search`, [status], `date_start`, `date_end`  
**Response: 200 OK** 
```
{
    "branches": [
        {
            "_id": "68a9b422eee708f4c12c741f",
            "ownerId": "68a993f85e472db9bc93b524",
            "name": "Hung Phu Badminton",
            "phone": "0987654321",
            "address": "299 Bui Minh Truc, TPHCM"
        }
    ]
}
```

#### 1.2. Thêm chi nhánh mới ✅

**Endpoint:** `POST /api/branch` 
**Request Body (JSON):** 
```
{
    "ownerId": "1",
    "name": "Sân cầu lông Passion Sport",
    "phone": "0987654321",
    "address": "123 Đường XYZ, Phường Chánh Hưng, TPHCM"
}
```
**Response: 201 Created**

#### 1.3. Lấy chi tiết chi nhánh ✅

**Endpoint:** `GET /api/branch`  
**Response: 200 OK** Chi tiết đầy đủ của chi nhánh

#### 1.4. Cập nhật thông tin chi nhánh ✅

**Endpoint:** `PUT /api/branch/{id}`  
**Parameters:** Thông tin cần cập nhật  
**Response:** Thông tin sản phẩm đã cập nhật

### 2. Quản lý sân ✅

#### 2.1. Lấy danh sách sân ✅

**Endpoint:** `GET /api/courts` 
**Parameters:** `page`, `limit`, `search`, [status],[sort]
**Response:** Danh sách chi nhánh với thông tin chi tiết

#### 2.2. Thêm sân mới  ✅

**Endpoint:** `POST /api/courts` 
**Request Body (JSON):**
```
{
    "branchId": "213",
    "courtTypeId": [optional],
    "name": "A",
    "isAvailable", true
}
```
**Response: 201 Created**

#### 2.3. Lấy chi tiết sân ✅

**Endpoint:** `GET /api/courts/{id}`  
**Response:** Chi tiết đầy đủ của sân

#### 2.4. Cập nhật thông tin sân ✅

**Endpoint:** `PUT /api/courts/{id}`  
**Parameters:** Thông tin cần cập nhật  
**Response:** Thông tin sản phẩm đã cập nhật

### 3. Quản lý bảng giá

#### 3.1. Lấy danh bảng giá 

**Endpoint:** `GET /api/priceList` 
**Parameters:** `page`, `limit`, `search`,[sort]
**Response:** Danh sách bảng với thông tin chi tiết

#### 3.2. Thêm bảng giá mới

**Endpoint:** `POST /api/priceList` 
**Request Body (JSON):**
```
{
    "branchId": "124",
    "courtTypeId": [optional],
    "price": 50000,
    "date": 1 // => Hiển thị thứ trong tuần
}
``` 
**Response:** Thông tin giá đã tạo

#### 3.3. Lấy chi tiết bảng giá

**Endpoint:** `GET /api/priceList/{id}`  
**Response:** Chi tiết đầy đủ của bảng giá

#### 3.4. Cập nhật thông tin bảng giá

**Endpoint:** `GET /api/priceList/{id}`  
**Parameters:** Thông tin cần cập nhật  
**Response:** Thông tin sản phẩm đã cập nhật

#### 3.5. Xóa bảng giá 

**Endpoint:** `DELETE /api/priceList/{id}`  
**Response:** Thông báo thành công

### 4. Quản lý người dùng

#### 4.1. Lấy danh sách người dùng

**Endpoint:** `GET /api/accounts`  
**Parameters:** `page`, `limit`, `search`, [status],[role]
**Response:** Danh sách người dùng

#### 4.2. Thêm sân người dùng mới

**Endpoint:** `POST /api/accounts`  
**Request:** Thông tin người dùng  
**Response:** Thông tin người dùng đã tạo

#### 4.3. Lấy chi tiết người dùng 

**Endpoint:** `GET /api/accounts/{}`  
**Response:** Chi tiết người dùng

#### 4.4. Cập nhật thông tin người dùng 

**Endpoint:** `PUT /api/accounts/{id}`  
**Request:** Thông tin cần cập nhật  
**Response:** Thông tin người dùng đã cập nhật

#### 5.5. Xóa người dùng 

**Endpoint:** `DELETE /api/accounts/{id}`  
**Response:** Thông báo thành công

### 5. Quản lý nhóm quyền

#### 5.1. Lấy danh sách nhóm quyền 

**Endpoint:** `GET /api/roles`  
**Parameters:** `page`, `limit`,`search`, [status]  
**Response:** Danh sách nhóm quyền

#### 5.2. Thêm nhóm quyền mới 

**Endpoint:** `POST /api/roles`  
**Request:** Thông tin nhóm quyền  
**Response:** Thông tin nhóm quyền đã tạo

#### 5.3. Cập nhật nhóm quyền 

**Endpoint:** `PUT /api/roles/{id}`  
**Request:** Thông tin cần cập nhật  
**Response:** Thông tin nhóm quyền đã cập nhật

#### 5.4. Xóa nhóm quyền 

**Endpoint:** `DELETE /api/roles/{id}`  
**Response:** Thông báo thành công

### 6. Quản lý mã giảm giá

#### 6.1. Lấy danh sách mã giảm giá

**Endpoint:** `GET /api/vouchers`  
**Parameters:** `page`, `limit`, `search`, [status], `date_start`, `date_end`  
**Response:** Danh sách mã giảm giá

#### 6.2. Thêm mã giảm giá mới

**Endpoint:** `POST /api/vouchers`  
**Request:** Thông tin mã giảm giá  
**Response:** Thông tin mã giảm giá đã tạo

#### 6.3. Cập nhật mã giảm giá

**Endpoint:** `PUT /api/vouchers/{id}`  
**Request:** Thông tin cần cập nhật  
**Response:** Thông tin mã giảm giá đã cập nhật

#### 6.4. Xóa mã giảm giá

**Endpoint:** `DELETE /api/vouchers/{id}`  
**Response:** Thông báo thành công

### 7. Quản lý loại sân

#### 7.1. Lấy danh sách loại sân

**Endpoint:** `GET /api/courttypes`  
**Parameters:** `page`, `limit`, `search`, [status]
**Response:** Danh sách loại sân

#### 7.2. Thêm loại sân mới

**Endpoint:** `POST /api/courttypes`  
**Request:** Thông tin loại sân  
**Response:** Thông tin loại sân đã tạo

#### 7.3. Cập nhật loại sân

**Endpoint:** `PUT /api/courttypes/{id}`  
**Request:** Thông tin cần cập nhật  
**Response:** Thông tin loại sân đã cập nhật

#### 7.4. Xóa loại sân

**Endpoint:** `DELETE /api/courttypes/{id}`  
**Response:** Thông báo thành công

### 8. Quản lý thanh toán

#### 8.1. Lấy danh sách thanh toán

**Endpoint:** `GET /api/payments`  
**Parameters:** `page`, `limit`, `search`, [status], `date_start`, `date_end`  
**Response:** Danh sách thanh toán

#### 8.2. Lấy chi tiết thanh toán

**Endpoint:** `GET /api/payments/{id}`  
**Response:** Chi tiết thanh toán đầy đủ

#### 8.3. Cập nhật trạng thái thanh toán

**Endpoint:** `PUT /api/payments/status`  
**Request:** Trạng thái mới, ghi chú  
**Response:** Thông tin đơn hàng đã cập nhật

#### 8.4. Hủy thanh toán

**Endpoint:** `PUT /api/payments/{id}/cancel`  
**Request:** Lý do hủy  
**Response:** Thông tin thanh toán đã cập nhật

#### 8.5. Tạo thanh toán (khách khi đặt sân trực tiếp)

**Endpoint:** `POST /api/payments`  
**Request:** Thông tin thanh toán, phương thức thanh toán  
**Response:** Thông tin thanh toán

#### 8.6. Áp dụng mã giảm giá (khách khi đặt sân trực tiếp)

**Endpoint:** `POST /api/payments/voucher`  
**Request:** Mã giảm giá  
**Response:** Thông tin giỏ hàng đã áp dụng mã giảm giá


### 9. Thống kê

#### 9.1. Thống kê theo thời gian

**Endpoint:** `GET /api/statistics/revenue-cost`  
**Parameters:** `year`, [type] (year, month, day)  
**Response:** Dữ liệu thống kê doanh thu theo thời gian

#### 9.2. Thống kê doanh thu theo loại sân
 
**Endpoint:** `GET /api/admin/statistics/revenue-courtstype`  
**Parameters:** `year`, `month`, `limit`  
**Response:** Dữ liệu doanh thu theo từng loại sân\

#### 9.3. Thống kê doanh thu theo chi nhánh
 
**Endpoint:** `GET /api/admin/statistics/revenue-branch`  
**Parameters:** `year`, `month`, `limit`  
**Response:** Dữ liệu doanh thu theo từng chia nhánh





