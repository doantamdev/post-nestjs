// Middleware: Before Request
// Guard: Checking Permissions
// Interceptor: Before Request Handling
// Pipe: Validating Data
// Controller: Handling Request
// Interceptor: After Request Handling

// Middleware → Trước tất cả.
// Guards → Kiểm tra quyền truy cập.
// Interceptors (Before) → Can thiệp vào request trước khi vào Controller.
// Pipes → Validate và transform dữ liệu đầu vào.
// Controller / Route Handler → Xử lý logic chính.
// Interceptors (After) → Can thiệp vào response trước khi gửi đi.
// Exception Filters → Bắt lỗi và xử lý nếu có exception.
