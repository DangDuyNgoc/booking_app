import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

type MenuHref =
  | "/account-offers"
  | "/account-addresses"
  | "/account-payment-methods"
  | "/account-support"
  | "/account-security"
  | "/account-policies";
const PROFILE_EDIT_HREF = "/account-profile-edit" as const;
const MEMBERSHIP_HREF = "/account-membership" as const;

type MenuItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  href: MenuHref;
};

const MENU_TOP: MenuItem[] = [
  { id: "m1", icon: "ticket-outline", label: "Ưu đãi của tôi", href: "/account-offers" },
  { id: "m2", icon: "location-outline", label: "Địa chỉ đã lưu", href: "/account-addresses" },
  { id: "m3", icon: "card-outline", label: "Phương thức thanh toán", href: "/account-payment-methods" }
];

const MENU_BOTTOM: MenuItem[] = [
  { id: "m4", icon: "help-buoy-outline", label: "Trung tâm hỗ trợ", href: "/account-support" },
  { id: "m5", icon: "settings-outline", label: "Cài đặt & Bảo mật", href: "/account-security" },
  { id: "m6", icon: "document-text-outline", label: "Điều khoản & Chính sách", href: "/account-policies" }
];

function MenuList({ items, onItemPress }: { items: MenuItem[]; onItemPress: (href: MenuHref) => void }) {
  return (
    <AppCard style={styles.menuBlock}>
      {items.map((item, index) => (
        <Pressable
          key={item.id}
          onPress={() => onItemPress(item.href)}
          style={({ pressed }) => [styles.menuRow, index !== items.length - 1 && styles.menuDivider, pressed && styles.menuRowPressed]}
        >
          <View style={styles.menuLeft}>
            <View style={styles.menuIconWrap}>
              <Ionicons name={item.icon} size={16} color={theme.colors.primaryDark} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
        </Pressable>
      ))}
    </AppCard>
  );
}

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
        <Ionicons name="notifications-outline" size={22} color={theme.colors.primaryDark} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={26} color="#1D4ED8" />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nguyễn Văn A</Text>
            <Text style={styles.phone}>090 123 4567</Text>
          </View>

          <Pressable onPress={() => router.push(PROFILE_EDIT_HREF)} style={({ pressed }) => [styles.editPill, pressed && styles.editPillPressed]}>
            <Text style={styles.editText}>Chỉnh sửa</Text>
          </Pressable>
        </AppCard>

        <Pressable onPress={() => router.push(MEMBERSHIP_HREF)} style={({ pressed }) => [styles.membershipCard, pressed && styles.membershipCardPressed]}>
          <View style={styles.membershipTop}>
            <Text style={styles.membershipLabel}>Hội viên ShipLogistics</Text>
            <Text style={styles.membershipPoints}>Điểm tích lũy</Text>
          </View>

          <View style={styles.membershipMiddle}>
            <View style={styles.rankWrap}>
              <Ionicons name="diamond" size={18} color="#FFFFFF" />
              <Text style={styles.rank}>Hạng Vàng</Text>
            </View>
            <Text style={styles.pointsValue}>520 điểm</Text>
          </View>

          <View style={styles.membershipBottom}>
            <Text style={styles.membershipHint}>Còn 480 điểm để lên hạng Bạch Kim</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </Pressable>

        <View style={styles.groupGap}>
          <MenuList items={MENU_TOP} onItemPress={(href) => router.push(href)} />
        </View>
        <View style={styles.groupGap}>
          <MenuList items={MENU_BOTTOM} onItemPress={(href) => router.push(href)} />
        </View>

        <View style={styles.logoutWrap}>
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={16} color={theme.colors.danger} />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </View>
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
  editPillPressed: {
    opacity: 0.85
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
  membershipCardPressed: {
    opacity: 0.92
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm
  },
  rankWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8
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
  menuRowPressed: {
    backgroundColor: "#F8FAFC"
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
  menuLabel: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600"
  },
  logoutWrap: {
    alignItems: "center",
    borderColor: "#F5B5B3",
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    marginTop: theme.spacing.lg,
    paddingVertical: 12
  },
  logoutContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8
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
