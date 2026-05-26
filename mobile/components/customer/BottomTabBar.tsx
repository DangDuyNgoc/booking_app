import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";

type TabKey = "home" | "payment" | "activity" | "account";

type BottomTabBarProps = {
  activeTab?: TabKey;
};

type TabItem = {
  key: TabKey;
  icon: string;
  label: string;
  href: "/customer" | "/payment" | "/activity" | "/account";
};

export function BottomTabBar({ activeTab = "home" }: BottomTabBarProps) {
  const tabs: TabItem[] = [
    { key: "home", icon: "⌂", label: "Trang chủ", href: "/customer" },
    { key: "payment", icon: "◉", label: "Thanh toán", href: "/payment" },
    { key: "activity", icon: "▤", label: "Hoạt động", href: "/activity" },
    { key: "account", icon: "◌", label: "Tài khoản", href: "/account" }
  ];

  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Link href={tab.href} asChild key={tab.key}>
            <Pressable style={styles.item}>
              <Text style={[styles.icon, isActive && styles.active]}>{tab.icon}</Text>
              <Text style={[styles.label, isActive && styles.active]}>{tab.label}</Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFFFFF",
    borderColor: theme.colors.border,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg
  },
  item: {
    alignItems: "center",
    flex: 1,
    gap: 2
  },
  icon: {
    color: theme.colors.mutedIcon,
    fontSize: 16
  },
  label: {
    color: theme.colors.mutedIcon,
    fontSize: 11,
    fontWeight: "600"
  },
  active: {
    color: theme.colors.primary
  }
});
