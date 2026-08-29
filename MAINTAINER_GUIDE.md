# Maintainer Guide

Tài liệu ngắn dành cho maintainer của repository.

## Bảo vệ branch `main`

Mục tiêu là mọi thay đổi từ contributor đi qua Pull Request và chỉ được merge sau khi maintainer duyệt.

Cấu hình khuyến nghị trên GitHub:

1. Mở `Settings` → `Branches` hoặc `Settings` → `Rules` → `Rulesets`.
2. Tạo rule áp dụng cho branch `main`.
3. Bật yêu cầu Pull Request trước khi merge.
4. Yêu cầu tối thiểu 1 approving review.
5. Bật dismiss stale approvals khi có commit mới nếu muốn review lại thay đổi sau approval.
6. Bật require conversation resolution before merging.
7. Bật required status checks và chọn workflow validation của repository sau khi workflow đã chạy ít nhất một lần.
8. Chặn force push và branch deletion.
9. Với repo chỉ có một maintainer, cân nhắc bật `Do not allow bypassing` nếu muốn chính maintainer cũng luôn đi qua PR; nếu cần xử lý emergency, giữ quyền bypass cho admin nhưng chỉ dùng có chủ đích.

## CODEOWNERS

Sau khi biết chính xác GitHub username hoặc team maintainer, có thể tạo `.github/CODEOWNERS`:

```text
* @YOUR_GITHUB_USERNAME

/v1/ @YOUR_GITHUB_USERNAME
/v2/ @YOUR_GITHUB_USERNAME
/v3/ @YOUR_GITHUB_USERNAME
/samples/ @YOUR_GITHUB_USERNAME
```

Sau đó bật `Require review from Code Owners` trong branch protection/ruleset.

Không commit placeholder `@YOUR_GITHUB_USERNAME` dưới tên `CODEOWNERS`, vì GitHub sẽ xem đó là owner không hợp lệ. Chỉ tạo file thật sau khi thay placeholder bằng account/team tồn tại.
