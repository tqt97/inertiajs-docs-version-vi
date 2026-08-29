# Product CRUD reference sample

Sample này là source companion cho nhóm bài `Samples & Thực chiến → Product CRUD: full sức mạnh Inertia`.

Mục tiêu: giữ backend đủ mỏng để tập trung vào React + TypeScript + Inertia.js v3.

## Những capability được dùng

- Server-side routing, validation và redirect flow.
- `useForm` với form key, `isDirty`, `processing`, `errors`, `recentlySuccessful`, `cancel`, `transform`.
- Upload ảnh với local preview, `form.progress`, FormData, replace/remove image và server validation.
- URL-driven filter/search/sort.
- Partial reload qua `only`.
- `preserveState`, `preserveScroll`, `replace`.
- Deferred props + React `<Deferred>`.
- Link prefetch + cache TTL.
- Optimistic page-prop update với rollback tự động.
- Flash message từ shared props.
- Pagination giữ filter.

Đây là source tham chiếu, không phải một Laravel application độc lập. Copy các file tương ứng vào project Laravel + Inertia React hiện có của bạn.


## Chuẩn bị storage cho ảnh

Sau khi copy sample vào Laravel app:

```bash
php artisan storage:link
```

Sample lưu file trong `public` disk dưới `products/` và chỉ gửi `image_url` sang React.
