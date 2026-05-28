import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountProfileEditScreen() {
  return (
    <AccountDetailScreen
      title="Chỉnh sửa hồ sơ"
      icon="create-outline"
      subtitle="Cập nhật thông tin cá nhân để việc nhận/giao hàng chính xác hơn."
      rows={[
        { id: "pe1", label: "Họ và tên", value: "Nguyễn Văn A" },
        { id: "pe2", label: "Số điện thoại", value: "090 123 4567" },
        { id: "pe3", label: "Email", value: "nguyenvana@email.com" },
        { id: "pe4", label: "Trạng thái hồ sơ", value: "Đã xác thực" }
      ]}
    />
  );
}
