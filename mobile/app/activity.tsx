import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

export default function ActivityScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeSegment, setActiveSegment] = useState<"live" | "history">("live");

  useEffect(() => {
    if (tab === "history") {
      setActiveSegment("history");
    }
  }, [tab]);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hoạt động</Text>
        <Ionicons name="notifications-outline" size={24} color={theme.colors.primaryDark} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.segmentWrap}>
          <Pressable style={[styles.segmentBtn, activeSegment === "live" && styles.segmentBtnActive]} onPress={() => setActiveSegment("live")}>
            <Text style={activeSegment === "live" ? styles.segmentTextActive : styles.segmentText}>Đang diễn ra</Text>
          </Pressable>
          <Pressable style={[styles.segmentBtn, activeSegment === "history" && styles.segmentBtnActive]} onPress={() => setActiveSegment("history")}>
            <Text style={activeSegment === "history" ? styles.segmentTextActive : styles.segmentText}>Lịch sử</Text>
          </Pressable>
        </View>

        {activeSegment === "live" ? (
          <View style={styles.tabContent}>
            <AppCard style={styles.liveCard}>
              <View style={styles.mapMock}>
                <View style={styles.pathArc} />
                <View style={styles.carDot}>
                  <MaterialCommunityIcons name="truck" size={18} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.badgeWrap}>
                <View style={[styles.liveBadge, { flexDirection: "row", alignItems: "center", gap: 4 }]}>
                  <Ionicons name="time-outline" size={14} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.primary, fontWeight: "700", fontSize: 11 }}>Đang đến (6 phút)</Text>
                </View>
              </View>

              <View style={styles.liveInfoRow}>
                <View>
                  <Text style={styles.driverName}>Tài xế đang đến</Text>
                  <Text style={styles.orderCode}>Mã đơn: #SL-8924A</Text>
                </View>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={20} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.actionRow}>
                <Pressable style={styles.trackBtn} onPress={() => router.push("/tracking?state=arriving&type=truck")}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Ionicons name="navigate-circle-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.trackText}>Theo dõi</Text>
                  </View>
                </Pressable>
                <View style={styles.callBtn}>
                  <Ionicons name="call" size={18} color={theme.colors.primaryDark} />
                </View>
              </View>
            </AppCard>

            <AppCard style={[styles.liveCard, { marginTop: theme.spacing.lg }]}>
              <View style={styles.mapMock}>
                <View style={[styles.pathArc, { borderColor: "#F59E0B", borderStyle: "dashed" }]} />
                <View style={[styles.carDot, { backgroundColor: "#F59E0B", right: 120, top: 48 }]}>
                  <MaterialCommunityIcons name="motorbike" size={18} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.badgeWrap}>
                <View style={[styles.liveBadge, { backgroundColor: "#FEF3C7", flexDirection: "row", alignItems: "center", gap: 4 }]}>
                  <Ionicons name="time-outline" size={14} color="#D97706" />
                  <Text style={{ color: "#D97706", fontWeight: "700", fontSize: 11 }}>Đang chuẩn bị hàng (10 phút)</Text>
                </View>
              </View>

              <View style={styles.liveInfoRow}>
                <View>
                  <Text style={styles.driverName}>Chờ lấy hàng</Text>
                  <Text style={styles.orderCode}>Mã đơn: #SL-99128</Text>
                </View>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={20} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.actionRow}>
                <Pressable style={styles.trackBtn} onPress={() => router.push("/tracking?state=delivering&type=moto")}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Ionicons name="navigate-circle-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.trackText}>Theo dõi</Text>
                  </View>
                </Pressable>
                <View style={styles.callBtn}>
                  <Ionicons name="call" size={18} color={theme.colors.primaryDark} />
                </View>
              </View>
            </AppCard>
          </View>
        ) : (
          <View style={styles.tabContent}>
            <Pressable
              onPress={() =>
                router.push(
                  "/order-detail?id=SLG-99210&service=Giao hàng siêu tốc&date=15/05/2024, 14:30&price=45.000đ&status=completed"
                )
              }
            >
              <AppCard style={styles.historyCardCustom}>
                <View style={styles.historyTopRow}>
                  <View style={styles.historyIconCircle}>
                    <MaterialCommunityIcons name="motorbike" size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.historyHeaderInfo}>
                    <Text style={styles.historyTitleText}>Giao hàng siêu tốc</Text>
                    <Text style={styles.historyTimeText}>15/05/2024, 14:30</Text>
                  </View>
                  <View style={[styles.statusBadgeCapsule, styles.badgeSuccess]}>
                    <Text style={styles.badgeSuccessText}>Đã hoàn thành</Text>
                  </View>
                </View>

                <View style={styles.dashedDivider} />

                <View style={styles.historyBottomRow}>
                  <Text style={styles.historyOrderCode}>Mã đơn: #SLG-99210</Text>
                  <Text style={styles.historyPriceText}>45.000đ</Text>
                </View>
              </AppCard>
            </Pressable>

            <Pressable
              onPress={() =>
                router.push(
                  "/order-detail?id=SLG-8419B&service=Giao Xe Tải 500kg&date=14/05/2024, 10:15&price=150.000đ&status=cancelled"
                )
              }
            >
              <AppCard style={styles.historyCardCustom}>
                <View style={styles.historyTopRow}>
                  <View style={[styles.historyIconCircle, { backgroundColor: "#FCE8E8" }]}>
                    <MaterialCommunityIcons name="truck" size={20} color={theme.colors.danger} />
                  </View>
                  <View style={styles.historyHeaderInfo}>
                    <Text style={styles.historyTitleText}>Giao Xe Tải 500kg</Text>
                    <Text style={styles.historyTimeText}>14/05/2024, 10:15</Text>
                  </View>
                  <View style={[styles.statusBadgeCapsule, styles.badgeDanger]}>
                    <Text style={styles.badgeDangerText}>Đã hủy đơn</Text>
                  </View>
                </View>

                <View style={styles.dashedDivider} />

                <View style={styles.historyBottomRow}>
                  <Text style={styles.historyOrderCode}>Mã đơn: #SLG-8419B</Text>
                  <Text style={[styles.historyPriceText, { color: "#7F1D1D" }]}>150.000đ</Text>
                </View>
              </AppCard>
            </Pressable>

            <Pressable
              onPress={() =>
                router.push(
                  "/order-detail?id=SLG-8201A&service=Ship Tiết Kiệm&date=12/05/2024, 09:00&price=27.000đ&status=completed"
                )
              }
            >
              <AppCard style={styles.historyCardCustom}>
                <View style={styles.historyTopRow}>
                  <View style={styles.historyIconCircle}>
                    <MaterialCommunityIcons name="motorbike" size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.historyHeaderInfo}>
                    <Text style={styles.historyTitleText}>Ship Tiết Kiệm</Text>
                    <Text style={styles.historyTimeText}>12/05/2024, 09:00</Text>
                  </View>
                  <View style={[styles.statusBadgeCapsule, styles.badgeSuccess]}>
                    <Text style={styles.badgeSuccessText}>Đã hoàn thành</Text>
                  </View>
                </View>

                <View style={styles.dashedDivider} />

                <View style={styles.historyBottomRow}>
                  <Text style={styles.historyOrderCode}>Mã đơn: #SLG-8201A</Text>
                  <Text style={styles.historyPriceText}>27.000đ</Text>
                </View>
              </AppCard>
            </Pressable>
          </View>
        )}
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
  tabContent: {},
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
  historyRight: {
    alignItems: "flex-end",
    marginLeft: "auto"
  },
  historyPrice: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "800"
  },
  statusBadge: {
    fontSize: 9,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden"
  },
  statusSuccess: {
    backgroundColor: "#DFF4EB",
    color: "#0B8F64"
  },
  statusDanger: {
    backgroundColor: "#FDE8E8",
    color: "#DC2626"
  },
  bottomBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  historyCardCustom: {
    backgroundColor: "#FFF",
    borderColor: "#F1F5F9",
    borderWidth: 1,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  historyTopRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  historyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center"
  },
  historyIconScooter: {
    fontSize: 18
  },
  historyHeaderInfo: {
    marginLeft: 12,
    flex: 1
  },
  historyTitleText: {
    color: "#1D2B3C",
    fontSize: 15,
    fontWeight: "700"
  },
  historyTimeText: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2
  },
  statusBadgeCapsule: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  badgeSuccess: {
    backgroundColor: "#E6F4EA"
  },
  badgeSuccessText: {
    color: "#086449",
    fontSize: 10,
    fontWeight: "700"
  },
  badgeDanger: {
    backgroundColor: "#FCE8E8"
  },
  badgeDangerText: {
    color: "#DC2626",
    fontSize: 10,
    fontWeight: "700"
  },
  dashedDivider: {
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: "#E2E8F0",
    height: 1,
    marginVertical: 12
  },
  historyBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  historyOrderCode: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600"
  },
  historyPriceText: {
    color: "#B45309",
    fontSize: 15,
    fontWeight: "800"
  }
});
