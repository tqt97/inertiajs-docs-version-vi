# Samples Research Notes

Ngày đối chiếu gần nhất: **2026-08-29**.

Phần `samples/` target Inertia.js **v3** và được kiểm tra dựa trên tài liệu/source chính thức trước khi biên soạn. Đây là research log để maintainer có thể audit lại khi framework thay đổi.

## Nguồn chính

- Forms: https://inertiajs.com/docs/v3/the-basics/forms
- File uploads: https://inertiajs.com/docs/v3/the-basics/file-uploads
- Optimistic updates: https://inertiajs.com/docs/v3/the-basics/optimistic-updates
- Partial reloads: https://inertiajs.com/docs/v3/data-props/partial-reloads
- Deferred props: https://inertiajs.com/docs/v3/data-props/deferred-props
- Prefetching: https://inertiajs.com/docs/v3/data-props/prefetching
- Error handling: https://inertiajs.com/docs/v3/advanced/error-handling
- Testing: https://inertiajs.com/docs/v3/advanced/testing
- React adapter exports/source: https://github.com/inertiajs/inertia/tree/3.x/packages/react/src

## API đã đối chiếu

- React `useForm`: `processing`, `errors`, `progress`, `isDirty`, `wasSuccessful`, `recentlySuccessful`, `cancel()`.
- React adapter export `InertiaFormProps`.
- `router.reload({ only: [...] })` cho partial reload cùng page component.
- Lazy server props qua closure để tránh evaluate data không được request.
- `Inertia::defer()` và `Deferred`; deferred prop hỗ trợ `rescue: true`.
- `<Link prefetch cacheFor="...">` và programmatic prefetch.
- Optimistic updates qua `router.optimistic(...)` / `useForm().optimistic(...)`, với rollback khi request thất bại.
- File request tự chuyển sang `FormData` khi có file; `forceFormData` dùng khi muốn ép multipart.

## Quy tắc khi framework đổi version

Nếu Inertia v3 minor/major thay đổi API liên quan, maintainer nên:

1. So diff official docs/source.
2. Tìm toàn bộ usage trong `samples/`.
3. Update sample và research note trong cùng PR.
4. Chạy `npm run validate`.
5. Ghi rõ API drift trong commit/PR description.

## Reference CRUD Product — audit 2026-08-29

Nhóm `samples/crud/product-*` và `examples/product-crud/` được kiểm tra riêng theo Inertia.js v3 hiện hành:

- Forms/useForm: keyed form history state, `processing`, `errors`, `isDirty`, `recentlySuccessful`, `cancel()`, `transform()`.
- Manual visits: `only`, `preserveState`, `preserveScroll`, `replace` và lifecycle options.
- Deferred props: `Inertia::defer()`, React `<Deferred>` và `rescue: true`.
- Prefetching: React `<Link prefetch cacheFor="...">`.
- Optimistic updates: `router.optimistic(...).patch(...)` và automatic rollback semantics.
- Independent HTTP scenarios: `useHttp` được nhắc trong scenario map, không dùng để thay thế page visit CRUD.

Thiết kế sample cố tình giữ filter/search/sort ở URL + server props, chỉ giữ text search tạm thời trong local state để debounce. Đây là quyết định state ownership, không phải giới hạn API.

## 2026-08-29 — Product image upload pass

Đã đối chiếu lại Inertia.js v3 official docs cho file upload và form helper trước khi nâng Product CRUD.

- File có trong request được Inertia tự chuyển sang `FormData`; có thể dùng `forceFormData` để ép multipart rõ ràng.
- React `useForm` expose `progress`, phù hợp để render upload percentage trực tiếp.
- Multipart với `PUT/PATCH/DELETE` có giới hạn ở một số stack; official docs khuyến nghị `POST` + `_method` khi cần method spoofing, Laravel hỗ trợ pattern này.
- Server-side validation vẫn đi qua Inertia form error flow, vì vậy sample không tự dựng JSON 422 mapper.

Official references:

- https://inertiajs.com/docs/v3/the-basics/file-uploads
- https://inertiajs.com/docs/v3/the-basics/forms

## 2026-08-29 — Deep practical samples audit

Đợt audit này tập trung nâng `samples/tips-tricks.mdx`, `samples/architecture/state-ownership.mdx` và các bài forms/performance/testing/production.

Đã đối chiếu thêm Inertia.js v3 official docs:

- Forms: `<Form>` / `useForm`, keyed history state, `cancelOnUnmount`, `withAllErrors()`, Precognition, cache tag invalidation.
- HTTP Requests: `useHttp`, request-local reactive state, validation/HTTP/network error callbacks, cancellation và history state.
- Events: `httpException`, `networkError`, `finish` và lifecycle instrumentation.
- Prefetching: per-link `cacheFor`, click/mount strategies, programmatic prefetch và fresh/stale cache duration.
- Partial reload/deferred props: prop boundary + lazy evaluation vẫn là điều kiện để optimization có ý nghĩa server-side.

Official references:

- https://inertiajs.com/docs/v3/the-basics/forms
- https://inertiajs.com/docs/v3/the-basics/http-requests
- https://inertiajs.com/docs/v3/advanced/events
- https://inertiajs.com/docs/v3/data-props/partial-reloads
- https://inertiajs.com/docs/v3/data-props/deferred-props
- https://inertiajs.com/docs/v3/data-props/prefetching
- https://inertiajs.com/docs/v3/the-basics/optimistic-updates

Editorial rule bổ sung: sample thực chiến phải cố gắng có đủ `happy path -> failure mode -> ownership/reconciliation -> test/checklist`, không chỉ có API snippet.

## 2026-08-29 — Final source/version verification

Đối chiếu thêm với các repository chính thức để tránh chỉ dựa vào prose của sample:

- Inertia core hiện có release v3.6.1 trong nhánh v3 tại thời điểm audit.
- `inertiajs/inertia-laravel` hiện có release v3.2.1 và branch 3.x hỗ trợ Laravel 11/12/13.
- Repository `inertiajs/docs` và source adapter vẫn được xem là nguồn kiểm chứng khi API documentation và implementation có dấu hiệu lệch nhau.

Nguồn:

- https://github.com/inertiajs/inertia
- https://github.com/inertiajs/inertia/releases
- https://github.com/inertiajs/inertia-laravel
- https://github.com/inertiajs/inertia-laravel/releases
- https://github.com/inertiajs/docs
