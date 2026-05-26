import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

export default function ActivityScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.userDot}>
          <Text style={styles.userDotText}>👤</Text>
        </View>
        <Text style={styles.headerTitle}>Hoạt động</Text>
        <Text style={styles.bell}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.segmentWrap}>
          <View style={[styles.segmentBtn, styles.segmentBtnActive]}>
            <Text style={styles.segmentTextActive}>Đang diễn ra</Text>
          </View>
          <View style={styles.segmentBtn}>
            <Text style={styles.segmentText}>Lịch sử</Text>
          </View>
        </View>

        <AppCard style={styles.liveCard}>
          <View style={styles.mapMock}>
            <View style={styles.pathArc} />
            <View style={styles.carDot}>
              <Text style={styles.carIcon}>🚚</Text>
            </View>
          </View>

          <View style={styles.badgeWrap}>
            <Text style={styles.liveBadge}>◷ Đang đến (6 phút)</Text>
          </View>

          <View style={styles.liveInfoRow}>
            <View>
              <Text style={styles.driverName}>Tài xế đang đến</Text>
              <Text style={styles.orderCode}>Mã đơn: #SL-8924A</Text>
            </View>
            <View style={styles.driverAvatar}>
              <Text>🚘</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.actionRow}>
            <View style={styles.trackBtn}>
              <Text style={styles.trackText}>◉ Theo dõi</Text>
            </View>
            <View style={styles.callBtn}>
              <Text style={styles.callText}>⌕</Text>
            </View>
          </View>
        </AppCard>

        <AppCard style={styles.historyCard}>
          <View style={styles.historyIconWrap}>
            <Text style={styles.historyIcon}>📦</Text>
          </View>
          <View>
            <Text style={styles.historyTitle}>Giao hàng hỏa tốc</Text>
            <Text style={styles.historyMeta}>Chờ lấy hàng • #SL-99128</Text>
          </View>
        </AppCard>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="activity" />
      </View>
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
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md
  },
  userDot: {
    width: 26,
    height: 26,
    borderRadius: theme.radius.pill,
    backgroundColor: "#D8E8DF",
    alignItems: "center",
    justifyContent: "center"
  },
  userDotText: { fontSize: 13 },
  headerTitle: {
    flex: 1,
    color: theme.colors.primaryDark,
    fontSize: 30,
    fontWeight: "800"
  },
  bell: { color: theme.colors.primaryDark },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 130
  },
  segmentWrap: {
    flexDirection: "row",
    backgroundColor: "#EAF0F8",
    borderRadius: theme.radius.pill,
    padding: 4,
    gap: 6,
    marginBottom: theme.spacing.md
  },
  segmentBtn: {
    flex: 1,
    alignItems: "center",
    borderRadius: theme.radius.pill,
    paddingVertical: 8
  },
  segmentBtnActive: { backgroundColor: "#F6FBFF" },
  segmentText: { color: theme.colors.textSecondary, fontSize: 13, fontWeight: "700" },
  segmentTextActive: { color: theme.colors.primaryDark, fontSize: 13, fontWeight: "700" },
  liveCard: { padding: theme.spacing.sm },
  mapMock: {
    height: 128,
    borderRadius: theme.radius.md,
    backgroundColor: "#E2EAE0",
    overflow: "hidden",
    justifyContent: "center"
  },
  pathArc: {
    position: "absolute",
    left: 12,
    top: 28,
    width: 140,
    height: 96,
    borderWidth: 3,
    borderColor: "#32B06F",
    borderRadius: 80
  },
  carDot: {
    position: "absolute",
    right: 70,
    top: 36,
    backgroundColor: "#14A36D",
    borderRadius: theme.radius.pill,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center"
  },
  carIcon: { fontSize: 16 },
  badgeWrap: { marginTop: theme.spacing.sm },
  liveBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DDF8E9",
    color: theme.colors.primary,
    borderRadius: theme.radius.pill,
    fontSize: 11,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    overflow: "hidden",
    fontWeight: "700"
  },
  liveInfoRow: {
    marginTop: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  driverName: { color: theme.colors.textPrimary, fontSize: 28, fontWeight: "800" },
  orderCode: { color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.pill,
    backgroundColor: "#0E2436",
    alignItems: "center",
    justifyContent: "center"
  },
  divider: { height: 1, backgroundColor: "#E4EAF4", marginVertical: theme.spacing.md },
  actionRow: { flexDirection: "row", gap: theme.spacing.sm },
  trackBtn: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  trackText: { color: "#FFF", fontWeight: "700" },
  callBtn: {
    width: 46,
    backgroundColor: "#DEE8F7",
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center"
  },
  callText: { color: theme.colors.primaryDark, fontSize: 18 },
  historyCard: {
    marginTop: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  historyIconWrap: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    backgroundColor: "#E9EEF6",
    alignItems: "center",
    justifyContent: "center"
  },
  historyIcon: { fontSize: 16 },
  historyTitle: { color: theme.colors.textPrimary, fontWeight: "800", fontSize: 13 },
  historyMeta: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  bottomBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  }
});
