import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountAddressesScreen() {
  return (
    <AccountDetailScreen
      title="Địa chỉ đã lưu"
      icon="location-outline"
      subtitle="Danh sách điểm lấy hàng và giao hàng thường dùng của bạn."
      rows={[
        { id: "a1", label: "Địa chỉ nhà", value: "12 Nguyễn Huệ, Q1" },
        { id: "a2", label: "Địa chỉ công ty", value: "25 Lê Lợi, Q3" },
        { id: "a3", label: "Địa chỉ gần nhất", value: "3 ngày trước" }
      ]}
    />
  );
}
