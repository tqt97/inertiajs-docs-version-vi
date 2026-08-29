# Deployment Guide

## Phương án khuyến nghị: GitHub + Mintlify

Repository này dùng `docs.json` và MDX theo cấu trúc Mintlify, vì vậy cách ít thay đổi nhất là lưu source trên GitHub và để Mintlify build/host website.

## 1. Push lên GitHub

Tạo repository rỗng trên GitHub, không cần tạo README/LICENSE mới vì repo này đã có sẵn.

Sau khi giải nén:

```bash
cd inertiajs-docs-vi
git remote add origin git@github.com:YOUR_USERNAME/inertiajs-docs-vietnamese.git
git push -u origin main
```

## 2. Connect Mintlify

Trong Mintlify:

1. Tạo documentation project.
2. Connect GitHub repository.
3. Chọn branch `main`.
4. Đảm bảo `docs.json` nằm tại root repository.
5. Deploy.

## 3. Custom domain

Có thể deploy trước bằng domain do nền tảng cấp, sau đó thêm domain riêng trong project settings.

Ví dụ:

```text
inertia.example.com
```

Khi dùng domain riêng, cập nhật canonical/SEO theo domain thật trước khi index rộng rãi.

## 4. Workflow cập nhật

```bash
git checkout main
git pull

git checkout -b docs/update-v3-forms
# chỉnh tài liệu
npm run validate

git add .
git commit -m "docs(v3): improve forms translation"
git push -u origin docs/update-v3-forms
```

Mở Pull Request, review, merge về `main`, sau đó Mintlify deploy theo integration của project.

## GitHub Pages có phù hợp không?

Không nên dùng GitHub Pages trực tiếp cho source hiện tại vì repository chứa MDX và component/config dành cho Mintlify. Muốn dùng GitHub Pages cần thêm một static-site build/export pipeline hoặc migrate sang một static site generator khác.
