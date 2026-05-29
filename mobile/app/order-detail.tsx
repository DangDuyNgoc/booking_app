import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

export default function OrderDetailScreen() {
  const { id, service, date, price, status } = useLocalSearchParams<{
    id?: string;
    service?: string;
    date?: string;
    price?: string;
    status?: "completed" | "cancelled";
  }>();

  const orderId = id || "SLG-99210";
  const serviceName = service || "Giao hàng siêu tốc";
  const orderDate = date || "15/05/2024, 14:30";
  const orderPrice = price || "45.000đ";
  const isCompleted = status !== "cancelled";

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={15} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} />
        </Pressable>
        <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.orderLabel}>Mã đơn hàng</Text>
            <Text style={styles.orderCode}>{orderId}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.orderLabel}>Thời gian đặt</Text>
            <Text style={styles.orderValue}>{orderDate}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.orderLabel}>Trạng thái</Text>
            <View style={[styles.statusBadge, isCompleted ? styles.badgeSuccess : styles.badgeDanger]}>
              <Text style={isCompleted ? styles.badgeSuccessText : styles.badgeDangerText}>{isCompleted ? "Đã hoàn thành" : "Đã hủy đơn"}</Text>
            </View>
          </View>
        </AppCard>

        <Text style={styles.sectionTitle}>Hành trình giao nhận</Text>
        <AppCard style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={styles.iconCol}>
              <View style={[styles.routeIconWrap, { backgroundColor: "#E6F4EA" }]}>
                <Ionicons name="cube-outline" size={14} color="#0B8F64" />
              </View>
              <View style={styles.verticalLine} />
            </View>
            <View style={styles.routeTextCol}>
              <Text style={styles.routeLabel}>Điểm nhận hàng</Text>
              <Text style={styles.routeValue}>430 Điện Biên Phủ, Phường 25, Bình Thạnh</Text>
            </View>
          </View>

          <View style={styles.routeRow}>
            <View style={styles.iconCol}>
              <View style={[styles.routeIconWrap, { backgroundColor: "#FFF1E8" }]}>
                <Ionicons name="flag-outline" size={14} color="#F97316" />
              </View>
            </View>
            <View style={styles.routeTextCol}>
              <Text style={styles.routeLabel}>Điểm giao hàng</Text>
              <Text style={styles.routeValue}>380 Điện Biên Phủ, Phường 17, Bình Thạnh</Text>
            </View>
          </View>
        </AppCard>

        {isCompleted && (
          <>
            <Text style={styles.sectionTitle}>Tài xế vận chuyển</Text>
            <AppCard style={styles.driverCard}>
              <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.driverAvatar as any} />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>Michael T.</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.driverRating}>4.9 (Đã đánh giá)</Text>
                </View>
              </View>
              <View style={styles.licenseBox}>
                <Text style={styles.licenseLabel}>BIỂN SỐ XE</Text>
                <Text style={styles.licenseValue}>29A-123.45</Text>
              </View>
            </AppCard>
          </>
        )}

        <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
        <AppCard style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Dịch vụ</Text>
            <Text style={styles.paymentValue}>{serviceName}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Cước phí vận chuyển</Text>
            <Text style={styles.paymentValue}>{isCompleted ? "40.000đ" : orderPrice}</Text>
          </View>
          {isCompleted && (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Tiền tip tài xế</Text>
              <Text style={styles.paymentValue}>5.000đ</Text>
            </View>
          )}
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Khuyến mãi áp dụng</Text>
            <Text style={[styles.paymentValue, { color: "#0B8F64" }]}>-0đ</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={[styles.paymentLabel, { fontWeight: "800", color: theme.colors.textPrimary }]}>Tổng thanh toán</Text>
            <Text style={styles.totalPrice}>{orderPrice}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Phương thức thanh toán</Text>
            <View style={styles.paymentMethodWrap}>
              <Ionicons name="wallet-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.paymentValue}>Ví điện tử</Text>
            </View>
          </View>
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonPressed: {
    opacity: 0.8
  },
  headerSpacer: {
    width: 24,
    height: 24
  },
  headerTitle: {
    color: "#086449",
    fontSize: 18,
    fontWeight: "700"
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  statusCard: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderLabel: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: "500"
  },
  orderCode: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  orderValue: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600"
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  badgeSuccess: {
    backgroundColor: "#E6F4EA"
  },
  badgeSuccessText: {
    color: "#086449",
    fontSize: 11,
    fontWeight: "700"
  },
  badgeDanger: {
    backgroundColor: "#FCE8E8"
  },
  badgeDangerText: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "700"
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm
  },
  routeCard: {
    padding: theme.spacing.md,
    gap: 4
  },
  routeRow: {
    flexDirection: "row"
  },
  iconCol: {
    alignItems: "center",
    width: 24,
    marginRight: 8
  },
  routeIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center"
  },
  verticalLine: {
    width: 2,
    height: 38,
    backgroundColor: "#E2E8F0",
    marginVertical: 2
  },
  routeTextCol: {
    flex: 1
  },
  routeLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "600"
  },
  routeValue: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  driverInfo: {
    marginLeft: 12,
    flex: 1
  },
  driverName: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2
  },
  driverRating: {
    color: theme.colors.textSecondary,
    fontSize: 11
  },
  licenseBox: {
    alignItems: "flex-end"
  },
  licenseLabel: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: "600"
  },
  licenseValue: {
    color: "#086449",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2
  },
  paymentCard: {
    gap: theme.spacing.sm,
    padding: theme.spacing.md
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paymentLabel: {
    color: theme.colors.textSecondary,
    fontSize: 13
  },
  paymentValue: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600"
  },
  paymentMethodWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4
  },
  totalPrice: {
    color: "#B45309",
    fontSize: 16,
    fontWeight: "800"
  }
});
