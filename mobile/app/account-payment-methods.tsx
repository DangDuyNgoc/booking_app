import { AccountDetailScreen } from "../components/account/AccountDetailScreen";

export default function AccountPaymentMethodsScreen() {
  return (
    <AccountDetailScreen
      title="Phương thức thanh toán"
      icon="card-outline"
      subtitle="Theo dõi các phương thức thanh toán bạn đang sử dụng."
      rows={[
        { id: "p1", label: "Thẻ ngân hàng", value: "Vietcombank •••• 2489" },
        { id: "p2", label: "Ví điện tử", value: "MoMo đã liên kết" },
        { id: "p3", label: "Tiền mặt", value: "Đang bật" }
      ]}
    />
  );
}
