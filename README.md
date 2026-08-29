# Inertia.js — Tài liệu tiếng Việt 🇻🇳

Bản dịch tiếng Việt **không chính thức** của tài liệu Inertia.js, được xây dựng với mục đích **học tập, tra cứu và chia sẻ kiến thức với cộng đồng lập trình viên Việt Nam**.

Dự án cố gắng giữ nội dung sát với tài liệu gốc, đồng thời sử dụng cách diễn đạt tiếng Việt rõ ràng, tự nhiên và phù hợp với ngữ cảnh kỹ thuật. Tên API, component, prop, HTTP header, package, identifier và code example được giữ nguyên để người đọc có thể đối chiếu trực tiếp với tài liệu và source code chính thức.

> [!IMPORTANT]
> Đây không phải tài liệu chính thức của Inertia.js và dự án không đại diện, không được tài trợ hay chứng thực bởi đội ngũ Inertia.js. Khi cần xác nhận hành vi framework hoặc thông tin mới nhất, hãy ưu tiên tài liệu chính thức và source code Inertia.js.

### Nguồn Inertia.js chính thức

Mỗi bài dịch trong repository đều có mục **Tài liệu chính thức** ở cuối bài để người đọc có thể đối chiếu trực tiếp với trang nguồn đúng phiên bản.

Bản dịch trong repository này được biên soạn và đối chiếu dựa trên tài liệu chính thức của Inertia.js. Khi học một chủ đề, bạn nên giữ các nguồn dưới đây để có thể kiểm tra API và hành vi mới nhất:

- **Website Inertia.js:** https://inertiajs.com/
- **Tài liệu chính thức:** https://inertiajs.com/docs
- **Source code Inertia.js:** https://github.com/inertiajs/inertia
- **Laravel adapter:** https://github.com/inertiajs/inertia-laravel

Phần `v1/`, `v2/` và `v3/` là bản dịch theo từng phiên bản tài liệu. Tab **Samples & Thực chiến** là nội dung bổ sung do repository tự biên soạn dựa trên contract/API chính thức, nhằm giải thích cách kết hợp các tính năng trong tình huống thực tế. Nếu nội dung sample khác với tài liệu chính thức do framework thay đổi, **tài liệu và source code chính thức luôn là nguồn tham chiếu ưu tiên**.

## Nội dung hiện có

- Inertia.js **v1** — 31 trang.
- Inertia.js **v2** — 44 trang.
- Inertia.js **v3** — 50 trang.
- Navigation theo version.
- Code sample và technical identifier được bảo toàn.
- Typography dùng native system font stack để hiển thị tiếng Việt tốt trên macOS, Windows và Linux.
- Tab **Samples & Thực chiến** với CRUD end-to-end, form UX, upload, performance, production error handling và testing.

## Samples & Thực chiến

Ngoài phần dịch 1:1 theo version, repo có một khu vực nội dung tự biên soạn để giúp người học áp dụng Inertia.js vào project thật. Các bài sample hiện ưu tiên **Laravel + React + TypeScript + Inertia.js v3**, có code theo full flow và giải thích trade-off. Nội dung custom luôn được tách khỏi phần dịch chính thức để tránh gây nhầm lẫn.

Bắt đầu tại `samples/index.mdx`.

### Reference CRUD: Product

Repo có thêm một reference CRUD tập trung mạnh vào Frontend tại `samples/crud/product-reference-app.mdx`, kèm source copyable trong `examples/product-crud/`. Sample dùng một model `Product` đơn giản để minh họa cách phối hợp `useForm`, keyed history state, validation errors, loading/dirty/success state, URL-driven filters, partial reload, deferred props, prefetch, optimistic update, flash, preserve state/scroll và pagination trong cùng một feature. Luồng upload ảnh còn minh họa preview local, progress, validation, replace/remove image và multipart method spoofing để người đọc quan sát rõ lifecycle từ local UI state đến server props.

Ngoài CRUD, `samples/scenarios/inertia-patterns.mdx` tổng hợp các pattern theo bài toán thực tế như dashboard query nặng, modal form, upload, polling, infinite list và request tới external API.

## Mục tiêu của dự án

Dự án này tồn tại trước hết để học tốt hơn. Nếu bản dịch giúp bạn hiểu Inertia.js nhanh hơn, dùng framework tự tin hơn hoặc tiết kiệm thời gian tra cứu thì dự án đã hoàn thành một phần mục tiêu của mình.

Mình cũng rất vui khi dự án có thêm người đóng góp. Bạn có thể sửa lỗi chính tả, cải thiện cách diễn đạt, đối chiếu bản dịch với docs chính thức, cải thiện cấu trúc nội dung, báo link hỏng hoặc đề xuất cách trình bày dễ hiểu hơn. Mọi đóng góp thiện chí đều được chào đón. ❤️

## Chạy local

Yêu cầu khuyến nghị: Node.js 20+.

```bash
npm install
npm run docs:dev
```

Hoặc chạy trực tiếp Mintlify CLI:

```bash
npx mint dev
```

Preview mặc định tại:

```text
http://localhost:3000
```

Kiểm tra cấu trúc repo trước khi commit:

```bash
npm run validate
```

## Deploy bằng Mintlify

Repo được chuẩn bị để có thể deploy trực tiếp bằng Mintlify:

1. Push repository lên GitHub.
2. Tạo project trên Mintlify và kết nối repository.
3. Chọn branch `main`.
4. Mintlify đọc `docs.json` ở root và deploy website.
5. Mỗi lần push lên `main`, website có thể được deploy lại tự động theo cấu hình project Mintlify.

Chi tiết xem [DEPLOYMENT.md](./DEPLOYMENT.md).

## Đưa repo này lên GitHub

ZIP phát hành đã chứa sẵn Git repository và lịch sử commit được chia nhỏ. Sau khi giải nén:

```bash
cd inertiajs-docs-vi

git remote add origin git@github.com:YOUR_USERNAME/inertiajs-docs-vietnamese.git
git push -u origin main
```

Nếu dùng HTTPS:

```bash
git remote add origin https://github.com/YOUR_USERNAME/inertiajs-docs-vietnamese.git
git push -u origin main
```

Kiểm tra lịch sử trước khi push:

```bash
git log --oneline --decorate -10
```

> Lịch sử mẫu trong ZIP dùng địa chỉ `noreply@users.noreply.github.com`. Sau khi clone/giải nén, hãy cấu hình Git identity thật của bạn cho các commit tiếp theo bằng `git config user.name` và `git config user.email`.

## Đóng góp

Đọc [CONTRIBUTING.md](./CONTRIBUTING.md) trước khi tạo Pull Request. Quy tắc quan trọng nhất là:

- Không tự ý thay đổi ý nghĩa kỹ thuật của tài liệu gốc.
- Không dịch tên API, method, component, prop hoặc identifier.
- Ưu tiên tiếng Việt tự nhiên, rõ nghĩa thay vì dịch từng chữ.
- Một Pull Request nên tập trung vào một nhóm thay đổi rõ ràng.
- Chạy `npm run validate` trước khi gửi PR.

## Quy ước commit

Project dùng Conventional Commits ở mức đơn giản:

```text
docs: improve Vietnamese explanation for partial reloads
fix: correct broken internal link in v3 forms
style: improve documentation typography
seo: improve metadata for v2 pages
chore: update repository tooling
```

Chi tiết xem [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md).

## Chất lượng bản dịch

Quy trình và kết quả audit của bản dịch ban đầu được ghi tại [TRANSLATION_QA_VI.md](./TRANSLATION_QA_VI.md). Quy chuẩn biên tập cho các thay đổi mới nằm tại [TRANSLATION_STYLE_GUIDE.md](./TRANSLATION_STYLE_GUIDE.md).

## Bản quyền và nguồn

Nội dung tài liệu được dịch từ tài liệu Inertia.js. Tên Inertia.js, logo, nội dung gốc và các tài sản liên quan thuộc về chủ sở hữu tương ứng.

Repository này là dự án cộng đồng không chính thức phục vụ học tập. Xem thêm [NOTICE.md](./NOTICE.md) và [LICENSE](./LICENSE).

## Cảm ơn

Cảm ơn đội ngũ Inertia.js đã xây dựng framework và tài liệu gốc, Mintlify cho nền tảng documentation, và tất cả mọi người dành thời gian đọc, báo lỗi hoặc đóng góp cho bản dịch này.

Nếu bạn thấy một câu dịch chưa tự nhiên, một ví dụ khó hiểu hoặc một chi tiết không còn đúng với docs gốc, **hãy mở Issue hoặc Pull Request**. Bạn luôn được chào đón ở đây. 🚀
