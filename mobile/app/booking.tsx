import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppCard, SectionTitle } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

export default function BookingScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.back}>←</Text>
        <Text style={styles.logo}>ShipLogistics</Text>
        <Text style={styles.bell}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.locationPill}>
          <Text style={styles.locationText}>⌖ Vị trí hiện tại: Quận 1, TP. Hồ Chí Minh</Text>
        </View>

        <View style={styles.mapSpace} />

        <AppCard style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Text style={[styles.dot, styles.pickupDot]}>○</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressLabel}>Điểm nhận hàng</Text>
              <Text style={styles.addressValue}>430 Điện Biên Phủ, Phường 25</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Text style={[styles.dot, styles.dropoffDot]}>○</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressLabel}>Điểm giao hàng</Text>
              <Text style={styles.addressPlaceholder}>Nhập địa chỉ giao hàng...</Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.sectionRow}>
          <SectionTitle>Chọn dịch vụ</SectionTitle>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </View>

        <View style={styles.serviceGrid}>
          <AppCard style={[styles.serviceCard, styles.serviceActive]}>
            <Text style={styles.serviceIcon}>🏍</Text>
            <Text style={styles.serviceTag}>NHANH</Text>
            <Text style={styles.serviceName}>Ship Tiết Kiệm</Text>
            <Text style={styles.servicePrice}>22.000đ</Text>
            <Text style={styles.serviceEta}>Giao trong 30-45 phút</Text>
          </AppCard>

          <AppCard style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>🚚</Text>
            <Text style={styles.serviceName}>Xe Tải 500kg</Text>
            <Text style={styles.servicePrice}>150.000đ</Text>
            <Text style={styles.serviceEta}>Giao hàng cồng kềnh</Text>
          </AppCard>
        </View>

        <View style={styles.miniRow}>
          <AppCard style={styles.miniCard}>
            <Text style={styles.miniTitle}>Thanh toán</Text>
            <Text style={styles.miniValue}>Tiền mặt</Text>
          </AppCard>
          <AppCard style={styles.miniCard}>
            <Text style={styles.miniTitle}>Khuyến mãi</Text>
            <Text style={styles.miniValue}>2 ưu đãi</Text>
          </AppCard>
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng cước</Text>
          <Text style={styles.totalValue}>22.000 <Text style={styles.vnd}>VND</Text></Text>
        </View>
        <View style={styles.voucherWrap}>
          <Text style={styles.voucher}>-5.000đ từ Voucher</Text>
          <Text style={styles.beforeVoucher}>27.000đ</Text>
        </View>
        <View style={styles.submitBtn}>
          <Text style={styles.submitText}>Đặt Giao Hàng Ngay →</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF",
    borderBottomColor: "#E4EAF4",
    borderBottomWidth: 1
  },
  back: { color: theme.colors.primaryDark, fontSize: 22 },
  logo: { color: theme.colors.primaryDark, fontSize: 32, fontWeight: "800" },
  bell: { color: theme.colors.primaryDark },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 190
  },
  locationPill: {
    backgroundColor: "#F4F7FB",
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md
  },
  locationText: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "600" },
  mapSpace: {
    height: 86,
    borderRadius: theme.radius.md,
    backgroundColor: "#E6ECE3",
    marginBottom: theme.spacing.md
  },
  addressCard: { gap: theme.spacing.sm },
  addressRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm },
  dot: { fontSize: 18, width: 20, textAlign: "center" },
  pickupDot: { color: theme.colors.primary },
  dropoffDot: { color: "#B45309" },
  addressBox: {
    flex: 1,
    backgroundColor: "#EAF0F8",
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm
  },
  addressLabel: { color: theme.colors.textSecondary, fontSize: 11 },
  addressValue: { color: theme.colors.textPrimary, fontSize: 13, fontWeight: "600", marginTop: 2 },
  addressPlaceholder: { color: "#7D8EA7", fontSize: 13, marginTop: 2 },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.lg
  },
  seeAll: { color: theme.colors.primaryDark, fontWeight: "700", fontSize: 13 },
  serviceGrid: { flexDirection: "row", gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  serviceCard: { flex: 1, minHeight: 140 },
  serviceActive: { backgroundColor: "#DFF4EB", borderColor: theme.colors.primary },
  serviceIcon: { fontSize: 18 },
  serviceTag: {
    alignSelf: "flex-start",
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    color: "#FFF",
    borderRadius: theme.radius.pill,
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: "hidden"
  },
  serviceName: { color: theme.colors.textPrimary, fontSize: 13, fontWeight: "700", marginTop: theme.spacing.sm },
  servicePrice: { color: theme.colors.primaryDark, fontSize: 36, fontWeight: "800", marginTop: 2 },
  serviceEta: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  miniRow: { flexDirection: "row", gap: theme.spacing.sm, marginTop: theme.spacing.md },
  miniCard: { flex: 1 },
  miniTitle: { color: theme.colors.textSecondary, fontSize: 11 },
  miniValue: { color: theme.colors.textPrimary, fontWeight: "700", marginTop: 3 },
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg
  },
  totalLabel: { color: theme.colors.textSecondary, fontSize: 12 },
  totalValue: { color: theme.colors.textPrimary, fontSize: 42, fontWeight: "900" },
  vnd: { fontSize: 12, fontWeight: "700" },
  voucherWrap: { position: "absolute", right: theme.spacing.lg, top: theme.spacing.sm, alignItems: "flex-end" },
  voucher: { color: theme.colors.primary, fontSize: 11, fontWeight: "700" },
  beforeVoucher: { color: theme.colors.textSecondary, fontSize: 10, textDecorationLine: "line-through" },
  submitBtn: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  submitText: { color: "#FFF", fontWeight: "700", fontSize: 15 }
});
