# Báo cáo dịch thuật và QA — Inertia.js v1 / v2 / v3

## Phạm vi

- v1: 31 trang MDX.
- v2: 44 trang MDX.
- v3: 50 trang MDX.
- Tổng cộng: 125 trang tài liệu + 2 snippet cảnh báo phiên bản.
- Dịch phần nội dung đọc được, tiêu đề và metadata sang tiếng Việt.
- Giữ nguyên code block, API, identifier, HTTP method/header, path, URL và tên package/framework.

## Quy ước thuật ngữ

Các thuật ngữ có ý nghĩa trực tiếp trong API hoặc thường được dùng khi đọc source được giữ nguyên hoặc giữ kèm ngữ cảnh tiếng Việt, ví dụ: `props`, `state`, `partial reload`, `deferred props`, `once props`, `prefetch`, `SSR`, `hydration`, `persistent layout`, `optimistic update`, `request`, `response`, `callback`, `hook`, `event`.

Mục tiêu là bản dịch dễ đọc bằng tiếng Việt nhưng vẫn giúp developer đối chiếu trực tiếp với source code và tài liệu/API chính thức.

## SEO

- Đã thêm `description` tiếng Việt cho toàn bộ 125 trang.
- Đã Việt hóa tên tài liệu và các nhóm navigation trong `docs.json`.
- Không thay đổi slug/path hiện có để tránh ảnh hưởng liên kết và indexing đã tồn tại.

## Kiểm tra integrity

Đã kiểm tra tự động giữa source gốc và bản dịch:

- Số lượng page theo từng version không thay đổi.
- Fenced code block giữ nguyên byte-for-byte.
- `import` / `export` trong MDX giữ nguyên.
- URL và internal link token giữ nguyên số lượng theo từng file.
- Tất cả trang đều có frontmatter hợp lệ ở mức cấu trúc, có `title` và `description`.
- `docs.json` parse JSON thành công.
- Không phát hiện code fence bị thiếu đóng.

Kết quả structural QA: **PASS — 0 lỗi**.

## Giới hạn môi trường kiểm thử

Source được cung cấp không có `package.json` và môi trường xử lý không có Mintlify CLI, vì vậy không thể chạy full Mintlify preview/build tại đây. Thay vào đó đã thực hiện structural regression check trực tiếp trên toàn bộ MDX/JSON và so sánh code/link với source gốc.
