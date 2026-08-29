# Samples & Thực chiến — Deep Audit

Ngày audit: **2026-08-29**.

Mục tiêu của vòng này là đưa phần `samples/` từ mức tutorial sang **field guide có thể dùng để học, review feature và tham khảo khi triển khai production**.

## Scope

Đã rà toàn bộ 19 trang trong `samples/` theo các tiêu chí:

- có mental model/decision rule, không chỉ mô tả API;
- có code Laravel + React/TypeScript khi chủ đề phù hợp;
- nêu rõ state ownership;
- có happy path và failure mode;
- có production note/anti-pattern;
- có checklist hoặc test strategy cho các chủ đề có rủi ro;
- không làm lệch contract của tài liệu Inertia v3 đã đối chiếu.

## Nâng cấp trọng tâm

### Tips & tricks

Đã mở rộng thành field guide chuyên sâu với các nhóm:

- server-driven architecture;
- props/shared props;
- URL/query ownership;
- forms + validation + multiple forms;
- loading/progress;
- preserve state/scroll + scroll regions;
- partial reload/deferred/prefetch;
- optimistic update + reconciliation;
- race/cancellation;
- `useHttp`;
- flash/external redirects;
- router events + telemetry;
- production errors;
- asset versioning;
- authorization/data contracts/N+1;
- Precognition;
- `cancelOnUnmount`;
- `httpException` / `networkError`;
- cache freshness/invalidation;
- `withAllErrors()`.

### State ownership

Đã bổ sung:

- single-owner model;
- decision tree;
- server vs URL vs form vs local vs history state;
- derived state;
- optimistic projection;
- modal/tab/pagination ownership;
- loading/error ownership;
- race condition theo thời gian;
- Product Index và Product Edit case study;
- tiêu chí khi nào global client store thực sự hợp lý;
- PR review checklist.

## Các bài được làm sâu thêm

- `samples/crud/search-filter-pagination.mdx`
- `samples/forms/file-upload-progress.mdx`
- `samples/forms/loading-validation-errors.mdx`
- `samples/performance/partial-deferred-prefetch.mdx`
- `samples/performance/request-lifecycle.mdx`
- `samples/production/error-handling.mdx`
- `samples/testing/crud-tests.mdx`
- `samples/ux/optimistic-updates.mdx`

Các bài Product CRUD vốn đã có độ sâu lớn (backend contract, index, form, image upload, advanced flow, full flow) được giữ nguyên cấu trúc để tránh lặp nội dung; chúng được audit cùng quality gate chung.

## Research baseline

Đối chiếu Inertia.js v3 official docs cho:

- Forms / Precognition / history state / cancellation;
- HTTP Requests (`useHttp`);
- Events;
- Partial Reloads;
- Deferred Props;
- Prefetching;
- Optimistic Updates.

Chi tiết URL và API baseline được lưu trong `SAMPLES_RESEARCH_NOTES.md`.

## Validation

Chạy:

```bash
npm run validate
```

Quality gate hiện kiểm tra thêm:

- `docs.json` parse được;
- navigation page tồn tại;
- frontmatter/title;
- code fence cân bằng;
- version page count không drift;
- sample internal links resolve;
- toàn bộ sample page có frontmatter/title hợp lệ, không dùng `description`.

Ngoài ra companion PHP source được chạy `php -l` và repository được kiểm tra bằng `git diff --check` / `git fsck` trước khi đóng gói.

## Final Vietnamese terminology review — 2026-08-29

- Loại bỏ cách dùng ẩn dụ `đắt` / `đắt tiền` cho request, query, prop và page.
- Thay bằng mô tả cụ thể: `tốn nhiều tài nguyên`, `tốn nhiều thời gian xử lý`, `query nặng`, hoặc nêu rõ payload/latency/CPU/database cost.
- Bổ sung quality gate để sample mới không đưa cách diễn đạt mơ hồ này trở lại.
- Rà lại các Card title còn tiếng Anh trong upgrade guide v2/v3 và Việt hóa phần label hiển thị, đồng thời giữ nguyên tên API/feature khi cần đối chiếu.
- README bổ sung link trực tiếp tới website, docs, source Inertia.js và Laravel adapter chính thức.

### Regression checks của bản dịch chính thức

Vòng cuối còn đối chiếu lại `v1/`, `v2/`, `v3/` với source tiếng Anh gốc:

- file set của ba version không thay đổi;
- fenced code block khớp nguyên văn với source gốc;
- internal page links của ba version resolve được;
- các label Card còn sót tiếng Anh trong upgrade guide v2/v3 được Việt hóa ở phần hiển thị, không thay đổi URL/API/code;
- không thay đổi identifier, HTTP header hoặc code sample chỉ để “Việt hóa cho đẹp”.

## Publication-source gate

Toàn bộ sample page hiện phải:

- không có `description` trong frontmatter;
- có `title`;
- có mục `Tài liệu chính thức` ở cuối bài;
- dẫn về Inertia.js v3 official docs;
- tiếp tục pass internal-link, code-fence và editorial checks.
