import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard, SectionTitle } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

export default function DriverWithdrawScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={15}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} />
        </Pressable>
        <Text style={styles.title}>Rút Tiền</Text>
        <Text style={styles.help}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
          <Text style={styles.balanceValue}>1.234.567 <Text style={styles.vnd}>VND</Text></Text>
          <Text style={styles.balanceHint}>◉ Số dư khả dụng để rút</Text>
        </AppCard>

        <Text style={styles.fieldLabel}>Số tiền muốn rút</Text>
        <View style={styles.amountInput}>
          <Text style={styles.amountText}>500.000</Text>
          <Text style={styles.amountUnit}>VND</Text>
        </View>

        <View style={styles.amountChips}>
          <Text style={styles.chip}>200.000</Text>
          <Text style={[styles.chip, styles.chipActive]}>500.000</Text>
          <Text style={styles.chip}>Tất cả</Text>
        </View>

        <View style={styles.bankHeader}>
          <Text style={styles.fieldLabel}>Chọn tài khoản nhận tiền</Text>
          <Text style={styles.addBank}>+ Thêm ngân hàng</Text>
        </View>

        <AppCard style={[styles.bankCard, styles.bankCardActive]}>
          <View style={styles.bankIcon}><Text>💳</Text></View>
          <View style={styles.bankInfo}>
            <Text style={styles.bankName}>Vietcombank</Text>
            <Text style={styles.bankMeta}>**** 4567 • NGUYEN VAN A</Text>
          </View>
          <Text style={styles.check}>●</Text>
        </AppCard>

        <AppCard style={styles.bankCard}>
          <View style={styles.bankIcon}><Text>💳</Text></View>
          <View style={styles.bankInfo}>
            <Text style={styles.bankName}>Techcombank</Text>
            <Text style={styles.bankMeta}>**** 8901 • NGUYEN VAN A</Text>
          </View>
          <Text style={styles.uncheck}>○</Text>
        </AppCard>

        <View style={styles.withdrawBtn}><Text style={styles.withdrawText}>Rút Tiền</Text></View>

        <View style={styles.sectionRow}>
          <SectionTitle>Lịch sử rút tiền</SectionTitle>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </View>

        <View style={styles.historyList}>
          <AppCard style={styles.historyCard}>
            <View style={styles.historyLeft}><Text>✅</Text></View>
            <View style={styles.historyMain}>
              <Text style={styles.historyTitle}>Rút về Vietcombank</Text>
              <Text style={styles.historyTime}>15:30, 24 Th10 2023</Text>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyAmountSuccess}>-500.000 đ</Text>
              <Text style={styles.historyStatusSuccess}>THÀNH CÔNG</Text>
            </View>
          </AppCard>

          <AppCard style={styles.historyCard}>
            <View style={styles.historyLeft}><Text>🕘</Text></View>
            <View style={styles.historyMain}>
              <Text style={styles.historyTitle}>Rút về Techcombank</Text>
              <Text style={styles.historyTime}>08:15, 23 Th10 2023</Text>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyAmount}>-1.000.000 đ</Text>
              <Text style={styles.historyStatusPending}>ĐANG XỬ LÝ</Text>
            </View>
          </AppCard>
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="payment" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#DEE6F2",
    borderBottomWidth: 1,
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md
  },
  title: { flex: 1, color: theme.colors.primary, fontSize: 30, fontWeight: "800" },
  help: { color: theme.colors.primary },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md, paddingBottom: 150 },
  balanceCard: { minHeight: 106 },
  balanceLabel: { color: theme.colors.textSecondary, fontSize: 12 },
  balanceValue: { color: theme.colors.textPrimary, fontSize: 42, fontWeight: "900", marginTop: 2 },
  vnd: { fontSize: 12, fontWeight: "700" },
  balanceHint: {
    alignSelf: "flex-start",
    marginTop: theme.spacing.sm,
    backgroundColor: "#DDF8E9",
    color: theme.colors.primary,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    fontSize: 11,
    overflow: "hidden"
  },
  fieldLabel: { marginTop: theme.spacing.md, color: theme.colors.textPrimary, fontSize: 12, fontWeight: "600" },
  amountInput: {
    marginTop: theme.spacing.sm,
    backgroundColor: "#F2F6FC",
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    minHeight: 46
  },
  amountText: { color: theme.colors.textPrimary, fontSize: 33, fontWeight: "800" },
  amountUnit: { color: theme.colors.primary, fontSize: 12, fontWeight: "700" },
  amountChips: { flexDirection: "row", gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  chip: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#E4EBF5",
    borderRadius: theme.radius.pill,
    paddingVertical: 8,
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden"
  },
  chipActive: { backgroundColor: "#CFF4E6", color: theme.colors.primary },
  bankHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: theme.spacing.sm },
  addBank: { color: theme.colors.primary, fontSize: 12, fontWeight: "700", marginTop: theme.spacing.md },
  bankCard: { flexDirection: "row", alignItems: "center", marginTop: theme.spacing.sm, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md },
  bankCardActive: { borderColor: theme.colors.primary },
  bankIcon: { width: 34, height: 34, borderRadius: theme.radius.md, alignItems: "center", justifyContent: "center", backgroundColor: "#101827" },
  bankInfo: { flex: 1, marginLeft: theme.spacing.md },
  bankName: { color: theme.colors.textPrimary, fontSize: 13, fontWeight: "800" },
  bankMeta: { color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 },
  check: { color: theme.colors.primary, fontSize: 16 },
  uncheck: { color: theme.colors.textSecondary, fontSize: 16 },
  withdrawBtn: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.primaryDark, borderRadius: theme.radius.pill, minHeight: 48, alignItems: "center", justifyContent: "center" },
  withdrawText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  sectionRow: { marginTop: theme.spacing.lg, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  seeAll: { color: theme.colors.primary, fontSize: 12, fontWeight: "700" },
  historyList: { gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  historyCard: { flexDirection: "row", alignItems: "center", paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md },
  historyLeft: { width: 28, height: 28, borderRadius: theme.radius.pill, backgroundColor: "#E8EEF6", alignItems: "center", justifyContent: "center" },
  historyMain: { flex: 1, marginLeft: theme.spacing.sm },
  historyTitle: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700" },
  historyTime: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  historyRight: { alignItems: "flex-end" },
  historyAmountSuccess: { color: theme.colors.primary, fontSize: 12, fontWeight: "800" },
  historyAmount: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "800" },
  historyStatusSuccess: { color: theme.colors.primary, fontSize: 10, fontWeight: "700" },
  historyStatusPending: { color: "#B45309", fontSize: 10, fontWeight: "700" },
  bottomBarWrap: { position: "absolute", left: 0, right: 0, bottom: 0 }
});
