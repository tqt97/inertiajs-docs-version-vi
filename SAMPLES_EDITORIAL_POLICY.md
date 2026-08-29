# Samples & Field Guide Editorial Policy

`Samples & Thực chiến` là nội dung tự biên soạn của repository, không phải bản dịch chính thức của Inertia.js.

## Baseline kỹ thuật

- Mặc định target: Inertia.js v3.
- Stack sample chính: Laravel + React + TypeScript.
- API Inertia phải được đối chiếu với docs/source chính thức trước khi merge.
- Backend authorization, validation và business invariants luôn là source of truth.

## Yêu cầu với sample mới

- Có mục tiêu/runtime flow rõ ràng, không chỉ đưa snippet rời rạc.
- Code phải có đủ import/context để copy và điều chỉnh được.
- Nêu trade-off và failure path quan trọng.
- Không khẳng định best practice tuyệt đối nếu đó chỉ là lựa chọn kiến trúc.
- Nếu API phụ thuộc version, ghi rõ version.
- Không đưa package bên thứ ba vào sample nếu không thực sự cần.

Research log được lưu tại [SAMPLES_RESEARCH_NOTES.md](./SAMPLES_RESEARCH_NOTES.md). Khi API thay đổi, update research note trong cùng PR.

## Review checklist

- Route/method đúng.
- API client adapter đúng với v3.
- Validation/authorization không chỉ tồn tại phía client.
- Loading/error/success state được xử lý.
- Không duplicate server state vô cớ vào local state.
- Performance tip có giải thích điều kiện áp dụng.
- Sample không làm người đọc nhầm nội dung cộng đồng với official docs.
