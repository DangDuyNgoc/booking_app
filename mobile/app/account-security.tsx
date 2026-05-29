import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountSecurityScreen() {
  return (
    <AccountDetailScreen
      title="Cài đặt & Bảo mật"
      icon="settings-outline"
      subtitle="Quản lý quyền riêng tư, mật khẩu và thiết bị đăng nhập."
      rows={[
        { id: "se1", label: "Đổi mật khẩu", value: "Cập nhật 21/05/2026" },
        { id: "se2", label: "Xác thực 2 lớp", value: "Chưa bật" },
        { id: "se3", label: "Thiết bị đang đăng nhập", value: "2 thiết bị" }
      ]}
    />
  );
}
