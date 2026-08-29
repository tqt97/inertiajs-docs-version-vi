# Commit Convention

Repository dùng Conventional Commits theo hướng đơn giản, dễ đọc.

## Format

```text
<type>(optional-scope): <description>
```

Ví dụ:

```text
docs(v3): improve partial reload translation
fix(v2): correct broken forms link
seo(v1): improve page descriptions
style: use native system font stack
chore: update validation tooling
```

## Type được dùng

- `docs`: nội dung tài liệu hoặc bản dịch.
- `fix`: sửa lỗi chức năng, link, config hoặc regression.
- `seo`: metadata, description, canonical hoặc social metadata.
- `style`: typography/UI/CSS không thay đổi nội dung kỹ thuật.
- `chore`: tooling, repository maintenance, dependency/config phụ trợ.
- `test`: validation hoặc automated checks.
- `ci`: workflow CI/CD.
- `refactor`: tái cấu trúc mà không đổi behavior/nội dung.

## Quy tắc

- Dùng động từ ở dạng mệnh lệnh hoặc mô tả trực tiếp.
- Subject ngắn, rõ, không kết thúc bằng dấu chấm.
- Không gộp nhiều chủ đề không liên quan vào một commit.
- Commit dịch nội dung nên ghi version/scope khi hữu ích.
- Nếu thay đổi behavior/config quan trọng, giải thích lý do trong commit body.
