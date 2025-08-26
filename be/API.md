## I. API cho người dùng

### 1. Tài khoản người dùng

#### 1.1. Đăng ký tài khoản 

**Endpoint:** `POST /api/users`  
**Request:** Thông tin người dùng  
**Response:** Token và thông tin người dùng

#### 1.2. Đăng nhập (chưa hoàn thiện)

**Endpoint:** `POST /api/auth/login`  
**Request:** Username, Password  
**Response:** Token và thông tin người dùng

#### 1.3. Lấy thông tin người dùng 

**Endpoint:** `GET /api/users/me`  
**Response:** Thông tin chi tiết người dùng

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
**Request:** Thông tin đặt sân 
**Response:** Thông tin đã đặt sân

#### 2.2. Cập nhật thông tin đặt sân

**Endpoint:** `PUT /api/users/booking/{id}`  
**Request:** Cập nhật thông tin đặt sân cụ thể (giờ, hủy đặt,...) 
**Response:** Thông tin đặt sân đã cập nhật

#### 2.3. Lấy danh sách các sân đã đặt

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

## II. API cho phần Admin

### 1. Quản lý chia nhánh

#### 1.1. Lấy danh sách chia nhánh  

**Endpoint:** `GET /api/branch` 
**Parameters:** `page`, `limit`, `search`, [status], `date_start`, `date_end`  
**Response:** Danh sách chi nhánh với thông tin chi tiết

#### 1.2. Thêm chia nhánh mới

**Endpoint:** `POST /api/branch` 
**Request:** Thông tin chia nhánh, thời gian hoạt động, địa điểm 
**Response:** Thông tin chia nhánh đã tạo

#### 1.3. Lấy chi tiết chia nhánh

**Endpoint:** `GET /api/branch`  
**Response:** Chi tiết đầy đủ của chia nhánh

#### 1.4. Cập nhật thông tin chia nhánh

**Endpoint:** `GET /api/branch/{id}`  
**Parameters:** Thông tin cần cập nhật  
**Response:** Thông tin sản phẩm đã cập nhật

#### 1.5. Xóa chia nhánh

**Endpoint:** `DELETE /api/branch/{id}` 
**Response:** Thông báo thành công


### 2. Quản lý sân
#### 2.1. Lấy danh sách sân

**Endpoint:** `GET /api/courts` 
**Parameters:** `page`, `limit`, `search`, [status],[sort]
**Response:** Danh sách chi nhánh với thông tin chi tiết

#### 2.2. Thêm sân mới

**Endpoint:** `POST /api/courts` 
**Request:** Thông tin sân, giá , tên sân
**Response:** Thông tin sân đã tạo

#### 2.3. Lấy chi tiết sân

**Endpoint:** `GET /api/courts/{id}`  
**Response:** Chi tiết đầy đủ của sân

#### 2.4. Cập nhật thông tin sân

**Endpoint:** `GET /api/courts/{id}`  
**Parameters:** Thông tin cần cập nhật  
**Response:** Thông tin sản phẩm đã cập nhật

#### 2.5. Xóa sân

**Endpoint:** `DELETE /api/courts/{id}` 
**Response:** Thông báo thành công

### 3. Quản lý bảng giá
#### 3.1. Lấy danh bảng giá 

**Endpoint:** `GET /api/priceList` 
**Parameters:** `page`, `limit`, `search`,[sort]
**Response:** Danh sách bảng với thông tin chi tiết

#### 3.2. Thêm bảng giá mới

**Endpoint:** `POST /api/priceList` 
**Request:** Thông tin giá 
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

#### 9.3. Thống kê doanh thu theo chia nhánh
 
**Endpoint:** `GET /api/admin/statistics/revenue-branch`  
**Parameters:** `year`, `month`, `limit`  
**Response:** Dữ liệu doanh thu theo từng chia nhánh





