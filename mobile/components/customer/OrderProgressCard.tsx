import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { AppCard } from "../ui/AppPrimitives";
import { PrimaryButton } from "../ui/PrimaryButton";

export function OrderProgressCard() {
  return (
    <AppCard style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>Nguyễn Văn A</Text>
          <Text style={styles.meta}>4.9 • Xe máy</Text>
        </View>
        <View style={styles.etaBox}>
          <Text style={styles.etaLabel}>Thời gian dự kiến</Text>
          <Text style={styles.etaValue}>15 Phút</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>
      <View style={styles.progressLabels}>
        <Text style={styles.progressActive}>Đã nhận hàng</Text>
        <Text style={styles.progressMuted}>Đang đến</Text>
        <Text style={styles.progressMuted}>Hoàn tất</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.ghostBtn}>
          <Text style={styles.ghostText}>✉ Nhắn tin</Text>
        </View>
        <View style={styles.callBtn}>
          <PrimaryButton label="☎ Gọi điện" />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "800"
  },
  meta: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2
  },
  etaBox: {
    alignItems: "flex-end"
  },
  etaLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11
  },
  etaValue: {
    color: theme.colors.primary,
    fontSize: 31,
    fontWeight: "800",
    marginTop: 2
  },
  progressTrack: {
    backgroundColor: "#D9E5F4",
    borderRadius: theme.radius.pill,
    height: 4,
    marginTop: theme.spacing.md,
    overflow: "hidden"
  },
  progressFill: {
    backgroundColor: theme.colors.primary,
    height: "100%",
    width: "34%"
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm
  },
  progressActive: {
    color: theme.colors.primaryDark,
    fontSize: 11,
    fontWeight: "700"
  },
  progressMuted: {
    color: theme.colors.textSecondary,
    fontSize: 11
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg
  },
  ghostBtn: {
    alignItems: "center",
    backgroundColor: "#DCE7F7",
    borderRadius: theme.radius.pill,
    flex: 1,
    justifyContent: "center",
    minHeight: 44
  },
  ghostText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  callBtn: {
    flex: 1
  }
});
