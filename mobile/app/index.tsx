import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../lib/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type RoleCardProps = {
  title: string;
  subtitle: string;
  iconName: string;
  iconFamily: "ionicons" | "material";
  color: string;
  bgColor: string;
  indicatorIcon: string;
  selected: boolean;
  onPress: () => void;
};

function RoleCard({
  title,
  subtitle,
  iconName,
  iconFamily,
  color,
  bgColor,
  indicatorIcon,
  selected,
  onPress
}: RoleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleCard,
        selected && [styles.roleCardSelected, { borderColor: color }],
        pressed && styles.roleCardPressed
      ]}
    >
      <View style={[styles.avatarWrap, { backgroundColor: bgColor }]}>
        {iconFamily === "ionicons" ? (
          <Ionicons name={iconName as any} size={48} color={color} />
        ) : (
          <MaterialCommunityIcons name={iconName as any} size={48} color={color} />
        )}
      </View>

      <View style={styles.roleTitleRow}>
        <Text style={styles.roleTitle}>{title}</Text>
        <View style={[styles.indicatorBadge, { backgroundColor: bgColor }]}>
          <Ionicons name={indicatorIcon as any} size={14} color={color} />
        </View>
      </View>

      <Text style={styles.roleSubtitle}>{subtitle}</Text>

      <View style={[styles.selectedMark, selected && { backgroundColor: color, borderColor: color }]}>
        <Ionicons name={selected ? "checkmark" : "ellipse-outline"} size={15} color={selected ? "#FFFFFF" : "#94A3B8"} />
      </View>
    </Pressable>
  );
}

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"customer" | "driver" | null>(null);

  const handleContinue = () => {
    if (selectedRole === "customer") {
      router.push("/customer");
      return;
    }

    if (selectedRole === "driver") {
      router.push("/driver");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerBlock}>
        <View style={styles.appIconContainer}>
          <Ionicons name="cube" size={32} color="#086449" />
        </View>
        <Text style={styles.headerTitle}>Bạn là ai?</Text>
        <Text style={styles.headerCopy}>
          Vui lòng chọn vai trò của bạn để tiếp tục trải nghiệm dịch vụ ShipLogistics một cách tốt nhất.
        </Text>
      </View>

      <View style={styles.cards}>
        <RoleCard
          title="Tôi là Khách hàng"
          subtitle="Gửi hàng nhanh chóng, theo dõi đơn hàng dễ dàng."
          iconName="person"
          iconFamily="ionicons"
          color="#086449"
          bgColor="#E6F4EA"
          indicatorIcon="cube"
          selected={selectedRole === "customer"}
          onPress={() => setSelectedRole("customer")}
        />

        <RoleCard
          title="Tôi là Tài xế"
          subtitle="Nhận chuyến ngay, gia tăng thu nhập mỗi ngày."
          iconName="motorbike"
          iconFamily="material"
          color="#0284C7"
          bgColor="#E0F2FE"
          indicatorIcon="navigate"
          selected={selectedRole === "driver"}
          onPress={() => setSelectedRole("driver")}
        />
      </View>

      <Pressable
        onPress={handleContinue}
        disabled={!selectedRole}
        style={({ pressed }) => [
          styles.continueButton,
          !selectedRole && styles.continueButtonDisabled,
          pressed && selectedRole && styles.continueButtonPressed
        ]}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </Pressable>

      <View style={styles.supportRow}>
        <Ionicons name="headset-outline" size={16} color={theme.colors.textSecondary} style={{ marginRight: 6 }} />
        <Text style={styles.supportText}>Bạn cần hỗ trợ?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 72,
    paddingBottom: theme.spacing.xl
  },
  headerBlock: {
    alignItems: "center"
  },
  appIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#E6F4EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
    shadowColor: "#086449",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2
  },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontSize: 32,
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
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  roleCardSelected: {
    borderWidth: 2,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4
  },
  roleCardPressed: {
    backgroundColor: "#F8FAFC",
    transform: [{ scale: 0.985 }]
  },
  avatarWrap: {
    alignItems: "center",
    borderRadius: theme.radius.pill,
    height: 100,
    justifyContent: "center",
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  roleTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: theme.spacing.md
  },
  roleTitle: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },
  indicatorBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  roleSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 20,
    marginTop: theme.spacing.xs,
    textAlign: "center"
  },
  selectedMark: {
    alignItems: "center",
    borderColor: "#CBD5E1",
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    marginTop: theme.spacing.md,
    width: 24
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    marginTop: theme.spacing.lg,
    minHeight: 50
  },
  continueButtonDisabled: {
    backgroundColor: "#94A3B8"
  },
  continueButtonPressed: {
    opacity: 0.9
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800"
  },
  supportRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto"
  },
  supportText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  }
});
