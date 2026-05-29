import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountOffersScreen() {
  return (
    <AccountDetailScreen
      title="Ưu đãi của tôi"
      icon="ticket-outline"
      subtitle="Quản lý các mã giảm giá và khuyến mãi đang có."
      rows={[
        { id: "o1", label: "Voucher còn hiệu lực", value: "3 mã" },
        { id: "o2", label: "Voucher hết hạn", value: "5 mã" },
        { id: "o3", label: "Ưu đãi sắp hết hạn", value: "1 mã" }
      ]}
    />
  );
}
