import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

type MenuItem = {
  id: string;
  icon: string;
  label: string;
};

const MENU_TOP: MenuItem[] = [
  { id: "m1", icon: "🎟", label: "Ưu đãi của tôi" },
  { id: "m2", icon: "📍", label: "Địa chỉ đã lưu" },
  { id: "m3", icon: "💳", label: "Phương thức thanh toán" }
];

const MENU_BOTTOM: MenuItem[] = [
  { id: "m4", icon: "🛟", label: "Trung tâm hỗ trợ" },
  { id: "m5", icon: "⚙", label: "Cài đặt & Bảo mật" },
  { id: "m6", icon: "📄", label: "Điều khoản & Chính sách" }
];

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <AppCard style={styles.menuBlock}>
      {items.map((item, index) => (
        <View key={item.id} style={[styles.menuRow, index !== items.length - 1 && styles.menuDivider]}>
          <View style={styles.menuLeft}>
            <View style={styles.menuIconWrap}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      ))}
    </AppCard>
  );
}

export default function AccountScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
        <Text style={styles.headerBell}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nguyễn Văn A</Text>
            <Text style={styles.phone}>090 123 4567</Text>
          </View>

          <View style={styles.editPill}>
            <Text style={styles.editText}>Chỉnh sửa</Text>
          </View>
        </AppCard>

        <View style={styles.membershipCard}>
          <View style={styles.membershipTop}>
            <Text style={styles.membershipLabel}>Hội viên ShipLogistics</Text>
            <Text style={styles.membershipPoints}>Điểm tích lũy</Text>
          </View>

          <View style={styles.membershipMiddle}>
            <Text style={styles.rank}>● Hạng Vàng</Text>
            <Text style={styles.pointsValue}>520 điểm</Text>
          </View>

          <View style={styles.membershipBottom}>
            <Text style={styles.membershipHint}>Còn 480 điểm để lên hạng Bạch Kim</Text>
            <Text style={styles.membershipArrow}>→</Text>
          </View>
        </View>

        <View style={styles.groupGap}>
          <MenuList items={MENU_TOP} />
        </View>
        <View style={styles.groupGap}>
          <MenuList items={MENU_BOTTOM} />
        </View>

        <View style={styles.logoutWrap}>
          <Text style={styles.logoutText}>⎋ Đăng xuất</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="account" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md
  },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontSize: 28,
    fontWeight: "800"
  },
  headerBell: {
    color: theme.colors.primaryDark,
    fontSize: 15
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 140
  },
  profileCard: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    borderRadius: theme.radius.pill,
    height: 52,
    justifyContent: "center",
    width: 52
  },
  avatarEmoji: {
    fontSize: 28
  },
  profileInfo: {
    flex: 1,
    marginLeft: theme.spacing.md
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  phone: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 2
  },
  editPill: {
    backgroundColor: "#E0F5EC",
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8
  },
  editText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "700"
  },
  membershipCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.lg
  },
  membershipTop: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  membershipLabel: {
    color: "#B8F4DC",
    fontSize: 12
  },
  membershipPoints: {
    color: "#B8F4DC",
    fontSize: 12
  },
  membershipMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm
  },
  rank: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900"
  },
  pointsValue: {
    color: "#E6FFF6",
    fontSize: 27,
    fontWeight: "800"
  },
  membershipBottom: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm
  },
  membershipHint: {
    color: "#D8FFF0",
    fontSize: 11
  },
  membershipArrow: {
    color: "#FFFFFF",
    fontSize: 17
  },
  groupGap: {
    marginTop: theme.spacing.md
  },
  menuBlock: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs
  },
  menuRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md
  },
  menuDivider: {
    borderBottomColor: "#E8EEF7",
    borderBottomWidth: 1
  },
  menuLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.md
  },
  menuIconWrap: {
    alignItems: "center",
    backgroundColor: "#E8F0FC",
    borderRadius: theme.radius.pill,
    height: 28,
    justifyContent: "center",
    width: 28
  },
  menuIcon: {
    fontSize: 14
  },
  menuLabel: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600"
  },
  menuArrow: {
    color: theme.colors.textSecondary,
    fontSize: 22
  },
  logoutWrap: {
    alignItems: "center",
    borderColor: "#F5B5B3",
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    marginTop: theme.spacing.lg,
    paddingVertical: 12
  },
  logoutText: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: "700"
  },
  bottomBarWrap: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0
  }
});
