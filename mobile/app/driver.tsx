import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { HomeHeader } from "../components/customer/HomeHeader";
import { AppCard, SectionTitle } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

type RecentOrder = {
  id: string;
  icon: string;
  service: string;
  meta: string;
  amount: string;
  status: string;
};

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "o1",
    icon: "🍽",
    service: "Giao đồ ăn",
    meta: "10 phút trước • 2.5km",
    amount: "35.000đ",
    status: "Hoàn thành"
  },
  {
    id: "o2",
    icon: "📦",
    service: "Giao hàng siêu tốc",
    meta: "45 phút trước • 5.1km",
    amount: "62.500đ",
    status: "Hoàn thành"
  },
  {
    id: "o3",
    icon: "🧰",
    service: "Giao kiện hàng lớn",
    meta: "2 giờ trước • 8.0km",
    amount: "120.000đ",
    status: "Hoàn thành"
  }
];

export default function DriverScreen() {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <AppCard style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🧑‍✈️</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.driverName}>Nguyễn Văn A</Text>
            <Text style={styles.onlineStatus}>● Đang trực tuyến</Text>
          </View>
          <View style={styles.powerPill}>
            <Text style={styles.powerIcon}>◔</Text>
          </View>
        </AppCard>

        <View style={styles.earnCard}>
          <Text style={styles.earnLabel}>Thu nhập hôm nay</Text>
          <Text style={styles.earnValue}>412.500 VNĐ</Text>
          <View style={styles.earnTrendPill}>
            <Text style={styles.earnTrendText}>↗ +15% so với hôm qua</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <AppCard style={styles.statCard}>
            <Text style={styles.statIcon}>⦿</Text>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Đơn hoàn thành</Text>
          </AppCard>
          <AppCard style={styles.statCard}>
            <Text style={styles.statIcon}>◷</Text>
            <Text style={styles.statValue}>4.5h</Text>
            <Text style={styles.statLabel}>Thời gian online</Text>
          </AppCard>
        </View>

        <View style={styles.sectionHeader}>
          <SectionTitle>Đơn hàng gần đây</SectionTitle>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </View>

        <View style={styles.ordersList}>
          {RECENT_ORDERS.map((order) => (
            <AppCard key={order.id} style={styles.orderCard}>
              <View style={styles.orderIconWrap}>
                <Text style={styles.orderIcon}>{order.icon}</Text>
              </View>
              <View style={styles.orderMain}>
                <Text style={styles.orderService}>{order.service}</Text>
                <Text style={styles.orderMeta}>{order.meta}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderAmount}>{order.amount}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
            </AppCard>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="activity" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 150
  },
  profileCard: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#CAE7DA",
    borderRadius: theme.radius.pill,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  avatarEmoji: {
    fontSize: 22
  },
  profileInfo: {
    flex: 1,
    marginLeft: theme.spacing.md
  },
  driverName: {
    color: theme.colors.textPrimary,
    fontSize: 19,
    fontWeight: "800"
  },
  onlineStatus: {
    color: theme.colors.primary,
    fontSize: 12,
    marginTop: 2
  },
  powerPill: {
    alignItems: "center",
    backgroundColor: theme.colors.tertiary,
    borderRadius: theme.radius.pill,
    height: 28,
    justifyContent: "center",
    width: 56
  },
  powerIcon: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  earnCard: {
    backgroundColor: "#14986A",
    borderRadius: theme.radius.xl,
    marginTop: theme.spacing.lg,
    minHeight: 120,
    padding: theme.spacing.lg
  },
  earnLabel: {
    color: "#D4FFEF",
    fontSize: 14,
    fontWeight: "600"
  },
  earnValue: {
    color: "#FFFFFF",
    fontSize: 39,
    fontWeight: "900",
    marginTop: 4,
    textTransform: "uppercase"
  },
  earnTrendPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: theme.radius.pill,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6
  },
  earnTrendText: {
    color: "#E9FFF6",
    fontSize: 12,
    fontWeight: "700"
  },
  statsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg
  },
  statCard: {
    alignItems: "center",
    flex: 1,
    minHeight: 116,
    justifyContent: "center"
  },
  statIcon: {
    color: theme.colors.primary,
    fontSize: 19
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 4
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xl
  },
  seeAll: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "700"
  },
  ordersList: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm
  },
  orderCard: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  orderIconWrap: {
    alignItems: "center",
    backgroundColor: "#E8F0FC",
    borderRadius: theme.radius.pill,
    height: 36,
    justifyContent: "center",
    width: 36
  },
  orderIcon: {
    fontSize: 18
  },
  orderMain: {
    flex: 1,
    marginLeft: theme.spacing.md
  },
  orderService: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "800"
  },
  orderMeta: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2
  },
  orderRight: {
    alignItems: "flex-end"
  },
  orderAmount: {
    color: theme.colors.primaryDark,
    fontSize: 28,
    fontWeight: "800"
  },
  orderStatus: {
    backgroundColor: "#E4F8EF",
    borderRadius: theme.radius.pill,
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
    overflow: "hidden",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3
  },
  bottomBarWrap: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0
  }
});
