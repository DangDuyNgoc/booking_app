import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../ui/AppPrimitives";
import { theme } from "../../lib/theme";

type DetailRow = {
  id: string;
  label: string;
  value: string;
};

type AccountDetailScreenProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
  rows: DetailRow[];
};

export function AccountDetailScreen({ title, icon, subtitle, rows }: AccountDetailScreenProps) {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.primaryDark} />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name={icon} size={24} color={theme.colors.primaryDark} />
          </View>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.heroSubtitle}>{subtitle}</Text>
        </View>

        <AppCard style={styles.infoCard}>
          {rows.map((row, index) => (
            <View key={row.id} style={[styles.infoRow, index !== rows.length - 1 && styles.infoDivider]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: theme.radius.pill,
    backgroundColor: "#E8EEF7"
  },
  backButtonPressed: {
    opacity: 0.8
  },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontSize: 20,
    fontWeight: "800"
  },
  headerSpacer: {
    width: 32,
    height: 32
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: theme.radius.lg,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: theme.spacing.lg
  },
  heroIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: theme.radius.pill,
    backgroundColor: "#E8F0FC"
  },
  heroTitle: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  heroSubtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: 13,
    textAlign: "center"
  },
  infoCard: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md
  },
  infoDivider: {
    borderBottomColor: "#E8EEF7",
    borderBottomWidth: 1
  },
  infoLabel: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    flex: 1
  },
  infoValue: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    textAlign: "right"
  }
});
