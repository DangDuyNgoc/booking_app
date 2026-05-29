import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountPoliciesScreen() {
  return (
    <AccountDetailScreen
      title="Điều khoản & Chính sách"
      icon="document-text-outline"
      subtitle="Thông tin pháp lý, điều khoản dịch vụ và chính sách bảo mật."
      rows={[
        { id: "po1", label: "Điều khoản sử dụng", value: "Cập nhật 01/05/2026" },
        { id: "po2", label: "Chính sách bảo mật", value: "Cập nhật 15/04/2026" },
        { id: "po3", label: "Chính sách hoàn tiền", value: "Cập nhật 20/03/2026" }
      ]}
    />
  );
}
