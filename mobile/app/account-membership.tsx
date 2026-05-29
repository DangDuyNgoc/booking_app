import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountMembershipScreen() {
  return (
    <AccountDetailScreen
      title="Hội viên ShipLogistics"
      icon="diamond-outline"
      subtitle="Theo dõi hạng thành viên và điểm tích lũy của bạn."
      rows={[
        { id: "mbr1", label: "Hạng hiện tại", value: "Vàng" },
        { id: "mbr2", label: "Điểm tích lũy", value: "520 điểm" },
        { id: "mbr3", label: "Điểm cần để lên Bạch Kim", value: "480 điểm" },
        { id: "mbr4", label: "Cập nhật gần nhất", value: "28/05/2026" }
      ]}
    />
  );
}
