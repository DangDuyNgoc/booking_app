import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { Ionicons } from "@expo/vector-icons";

type TabKey = "home" | "payment" | "activity" | "account";

type BottomTabBarProps = {
  activeTab?: TabKey;
};

type TabItem = {
  key: TabKey;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  label: string;
  href: "/customer" | "/payment" | "/activity" | "/account";
};

export function BottomTabBar({ activeTab = "home" }: BottomTabBarProps) {
  const tabs: TabItem[] = [
    { 
      key: "home", 
      activeIcon: "home", 
      inactiveIcon: "home-outline", 
      label: "Trang chủ", 
      href: "/customer" 
    },
    { 
      key: "payment", 
      activeIcon: "card", 
      inactiveIcon: "card-outline", 
      label: "Thanh toán", 
      href: "/payment" 
    },
    { 
      key: "activity", 
      activeIcon: "receipt", 
      inactiveIcon: "receipt-outline", 
      label: "Hoạt động", 
      href: "/activity" 
    },
    { 
      key: "account", 
      activeIcon: "person", 
      inactiveIcon: "person-outline", 
      label: "Tài khoản", 
      href: "/account" 
    }
  ];

  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Link href={tab.href} asChild key={tab.key}>
            <Pressable style={styles.item}>
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <Ionicons 
                  name={isActive ? tab.activeIcon : tab.inactiveIcon} 
                  size={22} 
                  color={isActive ? theme.colors.primary : "#64748B"} 
                />
              </View>
              <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
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
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#E2E8F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.sm,
    paddingTop: 10,
    paddingBottom: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 12
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 4
  },
  iconContainer: {
    width: 48,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 4
  },
  activeIconContainer: {
    backgroundColor: "rgba(11, 143, 100, 0.08)"
  },
  label: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600"
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: "700"
  }
});
