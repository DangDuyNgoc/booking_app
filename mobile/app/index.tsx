import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../lib/theme";

type RoleCardProps = {
  title: string;
  subtitle: string;
  emoji: string;
  href: "/customer" | "/driver";
  rightIcon: string;
};

function RoleCard({ title, subtitle, emoji, href, rightIcon }: RoleCardProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.roleCard}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>{emoji}</Text>
        </View>

        <View style={styles.roleTitleRow}>
          <Text style={styles.roleTitle}>{title}</Text>
          <Text style={styles.roleIcon}>{rightIcon}</Text>
        </View>

        <Text style={styles.roleSubtitle}>{subtitle}</Text>
      </Pressable>
    </Link>
  );
}

export default function RoleSelectionScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.headerBlock}>
        <Text style={styles.headerTitle}>Bạn là ai?</Text>
        <Text style={styles.headerCopy}>
          Vui lòng chọn vai trò của bạn để tiếp tục trải nghiệm dịch vụ ShipLogistics một cách tốt
          nhất.
        </Text>
      </View>

      <View style={styles.cards}>
        <RoleCard
          title="Tôi là Khách hàng"
          subtitle="Gửi hàng nhanh chóng, theo dõi đơn hàng dễ dàng."
          emoji="🎁"
          href="/customer"
          rightIcon="✔"
        />

        <RoleCard
          title="Tôi là Tài xế"
          subtitle="Nhận chuyến ngay, gia tăng thu nhập mỗi ngày."
          emoji="🛵"
          href="/driver"
          rightIcon="🏍"
        />
      </View>

      <View style={styles.supportRow}>
        <Text style={styles.supportText}>◌ Bạn cần hỗ trợ?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 56,
    paddingBottom: theme.spacing.xl
  },
  headerBlock: {
    alignItems: "center"
  },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontSize: 39,
    fontWeight: "800"
  },
  headerCopy: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: theme.spacing.sm,
    maxWidth: 310,
    textAlign: "center"
  },
  cards: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl
  },
  roleCard: {
    alignItems: "center",
    backgroundColor: "#F8FBFF",
    borderColor: "#DCE6F3",
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    minHeight: 210,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg
  },
  avatarWrap: {
    alignItems: "center",
    backgroundColor: "#D5DEE7",
    borderRadius: theme.radius.pill,
    height: 116,
    justifyContent: "center",
    width: 116
  },
  avatarEmoji: {
    fontSize: 54
  },
  roleTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: theme.spacing.md
  },
  roleTitle: {
    color: theme.colors.textPrimary,
    fontSize: 36,
    fontWeight: "800"
  },
  roleIcon: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "700"
  },
  roleSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: theme.spacing.sm,
    textAlign: "center"
  },
  supportRow: {
    alignItems: "center",
    marginTop: "auto"
  },
  supportText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "600"
  }
});
