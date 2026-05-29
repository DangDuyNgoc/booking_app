import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountSupportScreen() {
  return (
    <AccountDetailScreen
      title="Trung tâm hỗ trợ"
      icon="help-buoy-outline"
      subtitle="Liên hệ đội ngũ hỗ trợ hoặc theo dõi các yêu cầu gần đây."
      rows={[
        { id: "s1", label: "Hotline", value: "1900 1234" },
        { id: "s2", label: "Email", value: "support@shiplogistics.vn" },
        { id: "s3", label: "Yêu cầu gần nhất", value: "#SP1029 - Đang xử lý" }
      ]}
    />
  );
}
