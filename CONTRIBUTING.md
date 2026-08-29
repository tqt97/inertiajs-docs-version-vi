# Đóng góp cho Inertia.js Docs tiếng Việt

Cảm ơn bạn muốn đóng góp. Dự án này hướng tới một bản dịch dễ đọc, sát tài liệu gốc và hữu ích cho cộng đồng lập trình viên Việt Nam.

## Những đóng góp được chào đón

- Sửa lỗi chính tả hoặc dấu câu tiếng Việt.
- Làm câu văn tự nhiên và dễ hiểu hơn nhưng không đổi ý nghĩa kỹ thuật.
- Đối chiếu bản dịch với tài liệu Inertia.js chính thức.
- Sửa link nội bộ, navigation hoặc metadata.
- Cải thiện tiêu đề, cấu trúc và khả năng tìm kiếm của nội dung.
- Cải thiện accessibility hoặc khả năng đọc.
- Bổ sung kiểm tra tự động cho documentation.

## Nguyên tắc dịch

1. Source chính thức của Inertia.js là nguồn sự thật cho nội dung kỹ thuật.
2. Không dịch API, class, component, hook, prop, method, HTTP header, package, event name hoặc identifier.
3. Không tự thêm behavior/framework guarantee mà source gốc không nói.
4. Code block phải giữ nguyên trừ khi chính source upstream thay đổi hoặc code có lỗi rõ ràng.
5. Thuật ngữ kỹ thuật phổ biến có thể giữ tiếng Anh khi dịch sẽ làm mất nghĩa hoặc gây khó tra cứu.
6. Ưu tiên văn phong kỹ thuật rõ ràng, tự nhiên và nhất quán.

Xem chi tiết tại [TRANSLATION_STYLE_GUIDE.md](./TRANSLATION_STYLE_GUIDE.md).

## Quy trình đóng góp

Fork repository, tạo branch nhỏ theo mục tiêu thay đổi:

```bash
git checkout -b docs/improve-v3-forms
```

Chạy local:

```bash
npm install
npm run docs:dev
```

Trước khi commit:

```bash
npm run validate
```

Tạo commit nhỏ, có chủ đích:

```bash
git add v3/the-basics/forms.mdx
git commit -m "docs: improve Vietnamese wording for v3 forms"
```

Push branch và mở Pull Request.

## Scope của Pull Request

Một PR tốt thường làm một việc:

```text
Tốt:
- sửa bản dịch cho v3 forms
- sửa link hỏng trong v2
- cải thiện cách diễn đạt và cấu trúc cho nhóm security

Không nên:
- sửa 40 trang + đổi CSS + đổi navigation + refactor tooling trong cùng PR
```

Nếu thay đổi lớn, hãy chia thành nhiều commit hoặc nhiều PR để review dễ hơn.

## Checklist trước khi gửi PR

- [ ] Nội dung đã được đối chiếu với source chính thức.
- [ ] Không dịch technical identifier.
- [ ] Code sample không bị thay đổi ngoài chủ đích.
- [ ] Không tạo link nội bộ hỏng.
- [ ] `npm run validate` thành công.
- [ ] Commit message theo convention của repository.
- [ ] PR mô tả rõ vấn đề và phạm vi thay đổi.

## Báo lỗi bản dịch

Nếu chưa muốn sửa code, bạn hoàn toàn có thể mở Issue. Hãy ghi:

- Version: v1 / v2 / v3.
- Đường dẫn trang.
- Đoạn đang có vấn đề.
- Tài liệu gốc tương ứng nếu có.
- Đề xuất cách sửa.

Issue nhỏ vẫn rất có giá trị. Cảm ơn bạn đã giúp tài liệu tốt hơn.
