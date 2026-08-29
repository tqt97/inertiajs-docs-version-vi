# Quy chuẩn biên tập bản dịch tiếng Việt

## Mục tiêu

Bản dịch phải giúp người đọc hiểu đúng Inertia.js mà vẫn có thể đối chiếu 1:1 với tài liệu và code chính thức.

## Giữ nguyên tiếng Anh

Không dịch các thành phần mang tính identifier hoặc contract, ví dụ:

- `useForm`, `router.visit`, `<Link>`, `<Form>`.
- `props`, `state` khi đang nói đến tên concept/API cụ thể.
- `X-Inertia`, `X-Inertia-Version` và HTTP header khác.
- Tên package, event, method, class, file và option.
- Nội dung code block.

## Có thể dịch và giữ thuật ngữ gốc

Khi thuật ngữ quan trọng cho việc tra cứu, lần xuất hiện đầu có thể dùng dạng:

```text
tải lại một phần (partial reload)
bố cục duy trì trạng thái (persistent layout)
version hóa asset (asset versioning)
```

Sau đó ưu tiên cách gọi nhất quán trong cùng trang.

## Văn phong

- Viết câu tiếng Việt tự nhiên, tránh bê nguyên cấu trúc tiếng Anh.
- Không thêm lời giải thích suy đoán như thể đó là behavior chính thức.
- Ưu tiên câu chủ động và ngắn vừa phải.
- Dấu câu và khoảng trắng theo chuẩn tiếng Việt.
- Heading cần ngắn, rõ và nhất quán giữa các version.

## Đối chiếu version

Không copy nội dung giữa v1/v2/v3 chỉ vì tên trang giống nhau. Luôn kiểm tra khác biệt của từng version, đặc biệt với API mới, protocol field, deprecated behavior và upgrade notes.

## SEO

Description phải:

- Viết bằng tiếng Việt tự nhiên.
- Phản ánh đúng nội dung trang.
- Không nhồi từ khóa.
- Không tuyên bố đây là tài liệu chính thức.

## Tránh ẩn dụ khó hiểu khi nói về hiệu năng

Không dùng từ **“đắt”** hoặc **“đắt tiền”** để dịch `expensive` trong ngữ cảnh query, request, prop hoặc computation. Đây là cách nói quen thuộc trong một số cuộc trao đổi kỹ thuật, nhưng không đủ rõ cho tài liệu học tập.

Hãy mô tả đúng loại chi phí đang nói tới:

- `expensive query` → `query tốn nhiều tài nguyên` hoặc `query có thời gian xử lý cao`;
- `expensive prop` → `prop tốn nhiều thời gian xử lý/truy vấn`;
- `expensive request` → `request tốn nhiều thời gian xử lý, truy vấn hoặc tài nguyên máy chủ`;
- `expensive page` → `page cần nhiều truy vấn hoặc thời gian xử lý`.

Nếu nguyên nhân đã biết, ưu tiên nói cụ thể hơn nữa, ví dụ `query aggregate trên bảng lớn`, `response có payload lớn`, `API bên ngoài có latency cao` hoặc `computation sử dụng nhiều CPU`. Mục tiêu là để người đọc hiểu **chi phí nằm ở đâu**, thay vì phải tự suy ra ý nghĩa của một ẩn dụ.
